import { useEffect, useRef, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import { AuthUser } from '../store/modules/auth/interface';
// import { OnboardingAuthResponse } from '../pages/OnboardingPage/ConfirmOTP';
import { removeAuthUser, setAuthUser } from '../store/modules/auth/actions';
import { useGlobalStore } from '../store';
import { logger } from '../utils/logger';
import httpService from '../services/htttpService';
import { usePost } from './useRequests';

export const useInterceptor = async () => {
  const { dispatch, state } = useGlobalStore();
  const User = useRef<AuthUser | null>(state.auth.user || null);
  const authUser = localStorage.getItem('authUser');

  const [refreshToken] = usePost<any>(
    'Mobility.Onboarding/api/Verification/refreshtoken',
  );

  const interceptorHandler = useCallback(
    () =>
      httpService.interceptors.response.use(
        async (response) => {
          // Return a successful response back to the calling service
          logger.log(
            'Using interceptor to handle success',
            User.current?.expiresIn,
          );

          return response;
        },
        async (error) => {
          // logger.log('error.status', User.current?.expiresIn);
          // Return any error which is not due to authentication back to the calling service
          if (error.response.status !== 401) {
            // logger.log('Not a 401 error');

            return new Promise((_, reject) => {
              reject(error);
            });
          }

          const { config } = error;
          const { headers, ...rest } = config as AxiosRequestConfig;

          // Logout user if token refresh didn't work or user is disabled
          if (
            error.config.url ===
              'Mobility.Onboarding/api/Verification/refreshtoken' ||
            error.response.message === 'Account is disabled.'
          ) {
            logger.log('failed to refresh, logging user out');
            dispatch(removeAuthUser());

            return new Promise((_, reject) => {
              reject(error);
            });
          }

          if (error.response.status === 401) {
            logger.log(error.response);
            logger.log(error.response?.result);
          }

          if (User.current && error.response.status === 401) {
            logger.log('attempting to refresh token', User);

            try {
              const result = await refreshToken({
                refreshToken: User.current?.refreshToken,
              });

              dispatch(setAuthUser(result.data.result));

              httpService.defaults.headers.common.authorization = `Bearer ${User.current?.accesssToken}`;

              logger.log('refresh token successful setting user');
            } catch (err) {
              // logger.log(err);
              logger.log('refresh token failed removing auth user');
              dispatch(removeAuthUser());

              return new Promise((_, reject) => {
                reject(err);
              });
            }
          }

          return new Promise((resolve, reject) => {
            return httpService
              .request(rest)
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          });
        },
      ),
    [dispatch, refreshToken],
  );

  useEffect(() => {
    if (authUser) {
      User.current = JSON.parse(authUser) as AuthUser;

      interceptorHandler();
    }
  }, [authUser, interceptorHandler]);
};
