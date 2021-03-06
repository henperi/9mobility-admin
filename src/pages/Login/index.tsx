import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { usePost } from '../../hooks/useRequests';
import { getFieldError } from '../../utils/formikHelper';
import { logger } from '../../utils/logger';
import { ErrorBox } from '../../components/UiKit/ErrorBox';
import { useGlobalStore } from '../../store';
import { Checkbox } from '../../components/UiKit/CheckBox';

import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import { Row } from '../../components/UiKit/Row';
import {
  setAuthUser,
  // setAuthUserToken,
} from '../../store/modules/auth/actions';

interface Response {
  result: {
    userId: number;
    token: string;
    roleName: string;
    name: string;
    photoUrl: string;
    email: string;
  };
  responseCode: number;
  message: string;
}

interface Error {
  message: string;
  responseCode: number;
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3VyaWZvbGxAeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOlsiMSIsIjA4MDM3OTMxMjM0Il0sImVtYWlsIjoic3VyaWZvbGxAeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwODAzNzkzMTIzNCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiJ7XCJVc2VySWRcIjoxLFwiVXNlclR5cGVcIjpcIkJhY2tPZmZpY2VVc2VyXCIsXCJNb2JpbGVOdW1iZXJcIjpcIjA4MDM3OTMxMjM0XCIsXCJXYWxsZXRBY2NvdW50Tm9cIjpudWxsLFwiQ3VzdG9tZXJOYW1lXCI6XCJTdXJhaiBGZWhpbnRvbGFcIixcIlVzZXJFbWFpbFwiOlwic3VyaWZvbGxAeWFob28uY29tXCIsXCJEZXZpY2VDb2RlXCI6bnVsbH0iLCJuYmYiOjE2MDM0NjY4NDQsImV4cCI6MTYwMzU3NDg0NCwiaXNzIjoiaHR0cDovL3d3dy5tb2JpbGl0eS5uZyIsImF1ZCI6Imh0dHA6Ly93d3cubW9iaWxpdHkubmcifQ
// .LamsEFSirghj3vNTOxsIAH6xtDuNJ5nn_V_4W39D4lk

export const LoginPage = () => {
  const [login] = usePost<Response>(
    'Mobility.OnboardingBackOffice/api/Admins/Login',
  );

  const { dispatch, state } = useGlobalStore();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const history = useHistory();

  const handleLogin = async (data: typeof formik.values) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const result = await login(data);
      setLoading(false);
      logger.log(result);

      // TODO: should probably replace this with replace setAuthUser later, backend needs to change this
      // logger.log(result.data.result);
      // dispatch(setAuthUserToken(result.data.result.token));
      dispatch(setAuthUser(result.data.result));
      history.push(`/dashboard`);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setErrorMessage((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required('This field is required'),
      password: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    if (state.auth.user?.token) {
      history.push('/dashboard');
    }
  }, [history, state.auth.user?.token]);

  return (
    <PageBody style={{ minHeight: '100vh' }} dark centeralize>
      <Column xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card fullWidth padding="7% 12%">
          <Row justifyContent="center">
            <Logo height={100} width={200} />
          </Row>
          <SizedBox height={20} />
          <Column>
            <Text variant="darker" size={32}>
              Log In
            </Text>
            <SizedBox height={15} />
            <Text variant="lighter">Log In to the my 9mobile</Text>
            <SizedBox height={20} />
            {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Email address"
                placeholder="Enter your email address"
                {...formik.getFieldProps('usernameOrEmail')}
                type="text"
                required
                title="must be a valid email address"
                error={getFieldError(
                  formik.errors.usernameOrEmail,
                  formik.touched.usernameOrEmail,
                )}
              />
              <TextField
                label="Password"
                placeholder="Enter your password"
                {...formik.getFieldProps('password')}
                type="password"
                required
                error={getFieldError(
                  formik.errors.password,
                  formik.touched.password,
                )}
              />
              <SizedBox height={20} />
              <Checkbox>Remember me</Checkbox>
              <SizedBox height={30} />
              <Button
                isLoading={loading}
                disabled={formik.touched && !formik.isValid}
                type="submit"
                // onClick={() => {
                //   window.location.href = '/dashboard';
                // }}
                fullWidth
              >
                Sign In
              </Button>
            </form>
            <SizedBox height={100} />
          </Column>
        </Card>
      </Column>
    </PageBody>
  );
};
