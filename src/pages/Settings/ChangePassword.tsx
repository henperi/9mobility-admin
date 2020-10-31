import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { Text } from '../../components/UiKit/Text';
import { Card } from '../../components/UiKit/Card';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { emptyError, IError } from './interface';
import { Modal } from '../../components/UiKit/Modal';
import { ErrorBox } from '../../components/UiKit/ErrorBox';
import { usePost } from '../../hooks/useRequests';
import { useGlobalStore } from '../../store';
import { logger } from '../../utils/logger';
import { getFieldError } from '../../utils/formikHelper';
import { removeAuthUser } from '../../store/modules/auth/actions';

export const ChangePassword = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updateError, setUpdateError] = useState<IError>(emptyError);

  const {
    state: {
      auth: { user },
    },
    dispatch,
  } = useGlobalStore();

  const history = useHistory();

  const [
    updateProfile,
    { error: updateProfileError, loading: updating },
  ] = usePost<Response>(
    `Mobility.OnboardingBackOffice/api/Admins/ChangeMyPassword`,
  );

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      currentPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Please enter your password')
        .matches(
          // eslint-disable-next-line max-len
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          'Password must contain at least 8 characters, one uppercase, one number and one special case character',
        ),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .when('password', {
          is: (password) => !!(password && password.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            "Password doesn't match",
          ),
        }),
      currentPassword: Yup.string().required('current password is required'),
    }),
    onSubmit: (values) => {
      setShowConfirmationModal(true);
    },
  });

  const handlePasswordChange = async () => {
    try {
      const response = await updateProfile({
        ...formik.values,
        id: user?.userId,
      });
      if (response.data) {
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
        formik.resetForm();
        dispatch(removeAuthUser());
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  useEffect(() => {
    if (updateProfileError) {
      setUpdateError(updateProfileError);
    }
  }, [updateProfileError]);

  const UpdateError = updateError?.message && (
    <ErrorBox>{updateError?.message}</ErrorBox>
  );

  const renderModals = () => (
    <>
      <Modal
        isVisible={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          setUpdateError(emptyError);
        }}
        header={{ title: 'Confirmation' }}
        size="sm"
      >
        {UpdateError}

        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.name},</Text>
          <SizedBox height={15} />
          <Text>Please confirm password change</Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handlePasswordChange}
                isLoading={updating}
                fullWidth
              >
                Confirm
              </Button>
            </Column>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => {
                  setShowConfirmationModal(false);
                  setUpdateError(emptyError);
                }}
                outline
                fullWidth
                variant="tertiary"
              >
                Cancel
              </Button>
            </Column>
          </Row>
        </Column>
      </Modal>

      <Modal
        isVisible={showSuccessModal}
        onClose={() => history.push('/login')}
        size="sm"
      >
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.name},</Text>
          <SizedBox height={15} />
          <Text>Your profile was updated successfully</Text>
          <SizedBox height={10} />
          <Button onClick={() => history.push('/login')} fullWidth>
            Done
          </Button>
        </Column>
      </Modal>
    </>
  );

  return (
    <Row>
      <Column xs={12} md={4}>
        <Text size={32}>Change Password</Text>
        <Text variant="lighter">Update your password</Text>
        <SizedBox height={10} />
      </Column>
      <Column xs={12} md={8} lg={6}>
        <Card style={{ padding: '2rem' }} fullWidth>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Old Password"
              placeholder="Enter your old password"
              {...formik.getFieldProps('currentPassword')}
              type="password"
              error={getFieldError(
                formik.errors.currentPassword,
                formik.touched.currentPassword,
              )}
            />
            <TextField
              label="New Password"
              placeholder="Enter your new password"
              {...formik.getFieldProps('password')}
              type="password"
              error={getFieldError(
                formik.errors.password,
                formik.touched.password,
              )}
            />
            <TextField
              label="Repeat Password"
              placeholder="Enter your new password again"
              {...formik.getFieldProps('confirmPassword')}
              type="password"
              error={getFieldError(
                formik.errors.confirmPassword,
                formik.touched.confirmPassword,
              )}
            />
            <Row justifyContent="flex-end">
              <Button>Update Password</Button>
            </Row>
          </form>
        </Card>
      </Column>
      {renderModals()}
    </Row>
  );
};
