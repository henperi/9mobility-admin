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
// import { SetScreen } from '.';
import { useGlobalStore } from '../../store';
import { Checkbox } from '../../components/UiKit/CheckBox';

import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import { Row } from '../../components/UiKit/Row';
// import logo from '../../assets/images/9mobile-logo-big.png';

interface Response {
  result: {
    trackingId: string;
    expiresIn: Date;
  };
  responseCode: number;
  message: string;
}

interface Error {
  message: string;
  responseCode: number;
}

export const LoginPage = () => {
  const [verifyNumber] = usePost<Response>(
    'Mobility.Onboarding/api/Verification/initiateverification',
  );

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const history = useHistory();

  const handleVerifyNumber = async (data: typeof formik.values) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const result = await verifyNumber(data);
      setLoading(false);

      history.push(
        `/onboarding/verifyOTP?mobileNumber=${data.email}&trackingId=${result.data.result.trackingId}`,
      );

      logger.log(result.data);
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email addresss')
        .required('This field is required'),
      password: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      handleVerifyNumber(values);
    },
  });

  const { state } = useGlobalStore();

  useEffect(() => {
    if (state.auth.isAuthenticated && state.auth.user?.email) {
      history.push('/dashboard');
    }
  }, [history, state.auth]);

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
                {...formik.getFieldProps('email')}
                type="email"
                required
                title="must be a valid email address"
                error={getFieldError(formik.errors.email, formik.touched.email)}
              />
              <TextField
                label="Password"
                placeholder="Enter your password"
                {...formik.getFieldProps('password')}
                type="email"
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
                // disabled={formik.touched && !formik.isValid}
                type="submit"
                onClick={() => {
                  window.location.href = '/dashboard';
                }}
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
