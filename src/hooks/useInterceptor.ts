import { useEffect, useRef, useCallback } from 'react';
import { AuthUser } from '../store/modules/auth/interface';

import { removeAuthUser } from '../store/modules/auth/actions';
import { useGlobalStore } from '../store';
import httpService from '../services/htttpService';

export const useInterceptor = async () => {
  const { dispatch, state } = useGlobalStore();

  const User = useRef<AuthUser | null>(state.auth.user || null);
  const authUser = localStorage.getItem('authUser');

  const interceptorHandler = useCallback(
    () =>
      httpService.interceptors.response.use(
        async (response) => {
          // Return a successful response back to the calling service
          return response;
        },
        async (error) => {
          if (error.response.status === 401) {
            // log user out
            dispatch(removeAuthUser());

            return new Promise((_, reject) => {
              reject(error);
            });
          }

          return new Promise((_, reject) => {
            reject(error);
          });
        },
      ),
    [dispatch],
  );

  useEffect(() => {
    if (authUser) {
      User.current = JSON.parse(authUser) as AuthUser;

      interceptorHandler();
    }
  }, [authUser, interceptorHandler]);
};
