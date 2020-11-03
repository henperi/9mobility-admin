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
import { usePost } from '../../hooks/useRequests';
import { useGlobalStore } from '../../store';
import { getFieldError } from '../../utils/formikHelper';
import { logger } from '../../utils/logger';
import { emptyError, IError } from '../Settings/interface';

interface RProps {
  showRoleDrawer: boolean;
  setShowRoleDrawer: any;
  setNewRoleSuccess: any;
  newRoleSuccess: boolean;
  roleToEdit?: {
    id: number;
    name: string;
  };
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
export const NewRole: React.FC<RProps> = ({
  showRoleDrawer,
  setShowRoleDrawer,
  setNewRoleSuccess,
  newRoleSuccess,
  roleToEdit,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [updateError, setUpdateError] = useState<IError>(emptyError);

  const {
    state: {
      auth: { user },
    },
    // dispatch,
  } = useGlobalStore();

  const [addRole, { error: addRoleError, loading: creating }] = usePost<
    Response
  >(`Mobility.OnboardingBackOffice/api/Roles/AddRole`);

  const [updateRole, { error: updateRoleError, loading: updating }] = usePost<
    Response
  >(`Mobility.OnboardingBackOffice/api/Roles/EditRole`);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Role name is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: (values) => {
      setShowConfirmationModal(true);
    },
  });

  useEffect(() => {
    if (roleToEdit) {
      formik.setFieldValue('name', roleToEdit.name);
    } else {
      formik.setFieldValue('name', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleToEdit]);

  const handleNewRole = async () => {
    try {
      if (roleToEdit) {
        const response = await updateRole({
          ...formik.values,
          Id: roleToEdit.id,
        });
        if (response.data) {
          setShowConfirmationModal(false);
          setNewRoleSuccess(true);
          formik.resetForm();
          setShowRoleDrawer(false);
        }
      } else {
        const response = await addRole({
          ...formik.values,
        });
        if (response.data) {
          setShowConfirmationModal(false);
          setNewRoleSuccess(true);
          formik.resetForm();
          setShowRoleDrawer(false);
        }
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  useEffect(() => {
    if (addRoleError) {
      setUpdateError(addRoleError);
    }

    if (updateRoleError) {
      setUpdateError(updateRoleError);
    }
  }, [addRoleError, updateRoleError]);

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
          <Text>
            Please confirm {roleToEdit ? 'Role update' : 'new role creation'}
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => handleNewRole()}
                isLoading={creating || updating}
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
        isVisible={newRoleSuccess}
        // onClose={() => history.push('/login')}
        size="sm"
      >
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.name},</Text>
          <SizedBox height={15} />
          <Text>
            {roleToEdit ? 'Role updated' : 'New role added'} successfully
          </Text>
          <SizedBox height={10} />
          <Button onClick={() => setNewRoleSuccess(false)} fullWidth>
            Done
          </Button>
        </Column>
      </Modal>
    </>
  );

  return (
    <Drawer showDrawer={showRoleDrawer} setShowDrawer={setShowRoleDrawer}>
      <Text weight={600}>{roleToEdit ? 'Update' : 'New'} Role</Text>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="name"
          placeholder="Enter Role name"
          {...formik.getFieldProps('name')}
          type="text"
          error={getFieldError(formik.errors.name, formik.touched.name)}
        />
        <TextField
          label="description"
          placeholder="Enter description"
          {...formik.getFieldProps('description')}
          type="text"
          error={getFieldError(
            formik.errors.description,
            formik.touched.description,
          )}
        />

        <Row justifyContent="flex-end">
          <Button>{roleToEdit ? 'Update' : 'Create'} Role</Button>
        </Row>
      </form>
      {renderModals()}
    </Drawer>
  );
};
