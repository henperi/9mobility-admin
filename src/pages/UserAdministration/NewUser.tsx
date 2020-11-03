import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Drawer } from '../../components/RightDrawer';
import { Button } from '../../components/UiKit/Button';
import { Column } from '../../components/UiKit/Column';
import { ErrorBox } from '../../components/UiKit/ErrorBox';
import { Modal } from '../../components/UiKit/Modal';
import { Row } from '../../components/UiKit/Row';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Text } from '../../components/UiKit/Text';
import { TextField } from '../../components/UiKit/TextField';
import { useFetch, usePost } from '../../hooks/useRequests';
import { useGlobalStore } from '../../store';
import { getFieldError, isFutureDate } from '../../utils/formikHelper';
import { logger } from '../../utils/logger';
import { emptyError, IError } from '../Settings/interface';

interface DProps {
  showDrawer: boolean;
  setShowDrawer: any;
  setNewUserSuccess: any;
  newUserSuccess: boolean;
}

export interface IRole {
  result: [
    {
      id: number;
      name: string;
    },
  ];
  responseCode: number;
  message: string;
}
export const NewUser: React.FC<DProps> = ({
  showDrawer,
  setShowDrawer,
  setNewUserSuccess,
  newUserSuccess,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [updateError, setUpdateError] = useState<IError>(emptyError);

  const {
    state: {
      auth: { user },
    },
    // dispatch,
  } = useGlobalStore();

  const [
    registerUser,
    { error: registerUserError, loading: creating },
  ] = usePost<Response>(
    `Mobility.OnboardingBackOffice/api/Admins/RegisterUser`,
  );

  const { data: rolesData } = useFetch<IRole>(
    `Mobility.OnboardingBackOffice/api/Roles/GetNameAndIds`,
  );

  const [roles, setRoles] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    if (rolesData) {
      const plansResults = rolesData?.result?.map((option) => ({
        label: option.name,
        value: String(option.id),
      }));

      setRoles(plansResults);
    }
  }, [rolesData]);

  const formik = useFormik({
    initialValues: {
      username: '',
      roleId: '',
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      dob: '',
      photoUrl: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('email is required'),
      firstName: Yup.string().required('First name is required'),
      roleId: Yup.string().required('Role is required'),
      lastName: Yup.string().required('Last name is required'),
      username: Yup.string().required('Username is required'),
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('Mobile number is required'),
      dob: Yup.string().test('DOB', 'Future dates are not allowed', (value) => {
        return !isFutureDate(value);
      }),
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
    }),
    onSubmit: (values) => {
      setShowConfirmationModal(true);
    },
  });

  const handleNewUser = async () => {
    try {
      const response = await registerUser({
        ...formik.values,
        roleId: Number(formik.values.roleId),
      });
      if (response.data) {
        setShowConfirmationModal(false);
        setNewUserSuccess(true);
        formik.resetForm();
        setShowDrawer(false);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  useEffect(() => {
    if (registerUserError) {
      setUpdateError(registerUserError);
    }
  }, [registerUserError]);

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
          <Text>Please confirm new user creation</Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => handleNewUser()}
                isLoading={creating}
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
        isVisible={newUserSuccess}
        // onClose={() => history.push('/login')}
        size="sm"
      >
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.name},</Text>
          <SizedBox height={15} />
          <Text>New user added successfully</Text>
          <SizedBox height={10} />
          <Button onClick={() => setNewUserSuccess(false)} fullWidth>
            Done
          </Button>
        </Column>
      </Modal>
    </>
  );

  return (
    <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer}>
      <Text weight={600}>New User</Text>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Username"
          placeholder="Enter Username"
          {...formik.getFieldProps('username')}
          type="text"
          error={getFieldError(formik.errors.username, formik.touched.username)}
        />
        <TextField
          label="Email"
          placeholder="Enter email"
          {...formik.getFieldProps('email')}
          type="email"
          error={getFieldError(formik.errors.email, formik.touched.email)}
        />
        <TextField
          label="First Name"
          placeholder="Enter a user name"
          {...formik.getFieldProps('firstName')}
          type="text"
          error={getFieldError(
            formik.errors.firstName,
            formik.touched.lastName,
          )}
        />
        <TextField
          label="Last Name"
          placeholder="Enter last name"
          {...formik.getFieldProps('lastName')}
          type="text"
          error={getFieldError(formik.errors.lastName, formik.touched.lastName)}
        />

        <TextField
          label="Select Role"
          placeholder="Select Role"
          dropDown
          dropDownOptions={roles}
          value={formik.values.roleId}
          onChange={(e) => formik.setFieldValue('roleId', e.target.value)}
          type="text"
          error={getFieldError(formik.errors.roleId, formik.touched.roleId)}
        />

        <TextField
          label="Mobile number"
          placeholder="Mobile number"
          onChange={(e) => {
            formik.setFieldValue('mobileNumber', e.target.value);
          }}
          type="tel"
          minLength={11}
          maxLength={11}
          error={getFieldError(
            formik.errors.mobileNumber,
            formik.touched.mobileNumber,
          )}
        />

        <TextField
          label="Date of birth"
          placeholder="Select DOB"
          {...formik.getFieldProps('dob')}
          type="date"
          error={getFieldError(formik.errors.dob, formik.touched.dob)}
        />

        <TextField
          label="New Password"
          placeholder="Enter your new password"
          {...formik.getFieldProps('password')}
          type="password"
          error={getFieldError(formik.errors.password, formik.touched.password)}
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
        <SizedBox height={40} />
        <Row justifyContent="flex-end">
          <Button>Invite User</Button>
        </Row>
      </form>
      {renderModals()}
    </Drawer>
  );
};
