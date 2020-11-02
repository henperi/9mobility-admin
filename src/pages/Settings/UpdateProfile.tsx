import React, { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { Text } from '../../components/UiKit/Text';
import { Card } from '../../components/UiKit/Card';
import { Avatar } from '../../components/UiKit/Avatar';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { ISingleUser } from '../UserAdministration/interface';
import { useFetch, usePost } from '../../hooks/useRequests';
import { useGlobalStore } from '../../store';
import { IError, Response, emptyError } from './interface';
import { logger } from '../../utils/logger';
import { Modal } from '../../components/UiKit/Modal';
import { ErrorBox } from '../../components/UiKit/ErrorBox';
import { getFieldError } from '../../utils/formikHelper';
import { Spinner } from '../../components/UiKit/Spinner';
import { Colors } from '../../themes/colors';

interface SuccessResp {
  responseCode: number;
  message: string;
}

export const UpdateProfile = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updateError, setUpdateError] = useState<IError>(emptyError);
  const [fileError, setFileError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>(new File([''], ''));

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const {
    data: profileData,
    loading: loadingProfile,
    refetch: refetchProfile,
  } = useFetch<ISingleUser>(
    `Mobility.OnboardingBackOffice/api/Admins/GetUser?id=${user?.userId}`,
  );

  const [
    updateProfile,
    { error: updateProfileError, loading: updating },
  ] = usePost<Response>(
    `Mobility.OnboardingBackOffice/api/Admins/UpdateProfile/`,
  );

  const [uploadImage, { loading: uploading, data: uploadData }] = usePost<
    SuccessResp
  >('Mobility.OnboardingBackOffice/api/Admins/UploadProfileImage');

  const formik = useFormik({
    initialValues: {
      lastName: profileData?.result?.lastName || '',
      firstName: profileData?.result.firstName || '',
    },
    validationSchema: Yup.object({
      lastName: Yup.string().required('This field is required'),
      firstName: Yup.string().required('This field is required'),
    }),
    onSubmit: () => {
      setShowConfirmationModal(true);
    },
  });

  const handleProfileUpdate = async () => {
    try {
      const response = await updateProfile({
        ...formik.values,
        id: user?.userId,
      });
      if (response.data) {
        refetchProfile();
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
        formik.resetForm();
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

  useEffect(() => {
    if (profileData) {
      formik.setFieldValue('firstName', profileData?.result?.firstName || '');
      formik.setFieldValue('lastName', profileData?.result?.lastName || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput && hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files instanceof FileList) {
      if (isFileImage(event.target.files[0])) {
        const file = event.target.files[0];
        const fileSize = parseFloat(`${file.size / (1024 * 1024)}`).toFixed(2);

        if (Number(fileSize) > 1) {
          setFileError('Please select image size less than 1 MB');
        } else {
          setFileError('');
          logger.log('file to upload: ', file);

          setSelectedFile(file);
        }
      } else {
        setFileError('Please select a valid JPEG or PNG file');
      }
    } else {
      setFileError('invalid file selected');
    }
  };

  useEffect(() => {
    if (selectedFile.name !== '') {
      (async () => {
        const data = new FormData();
        data.append('ProfileImage', selectedFile);
        data.append('Email', user?.email || '');
        data.append('Id', String(user?.userId) || '');
        logger.log('data is: ', data);
        try {
          const response = await uploadImage(data);
          if (response.data) {
            setSelectedFile(new File([''], ''));
            setFileError('');
          }
        } catch (errorResp) {
          setFileError(errorResp);
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const isFileImage = (file: File) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];

    return file && acceptedImageTypes.includes(file.type);
  };

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
          <Text>Please confirm profile update</Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handleProfileUpdate}
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
        onClose={() => setShowSuccessModal(false)}
        size="sm"
      >
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.name},</Text>
          <SizedBox height={15} />
          <Text>Your profile was updated successfully</Text>
          <SizedBox height={10} />
          <Button onClick={() => setShowSuccessModal(false)} fullWidth>
            Done
          </Button>
        </Column>
      </Modal>
    </>
  );

  return (
    <Row>
      <Column xs={12} md={4}>
        <Text size={32}>Personal Details</Text>
        <Text variant="lighter">Your personal details</Text>
        <SizedBox height={10} />
      </Column>
      <Column xs={12} md={8} lg={6}>
        <Card style={{ padding: '2rem', minHeight: '300px' }} fullWidth>
          {loadingProfile ? (
            <Spinner isFixed withLogo />
          ) : (
            <Fragment>
              {uploadData?.responseCode === 0 ? (
                <Text color={Colors.darkGreen} alignment="center">
                  Image uploaded successfully
                </Text>
              ) : null}

              <Row wrap alignItems="center" childGap={10}>
                <Avatar
                  style={{
                    width: '100px',
                    height: '100px',
                    marginRight: '1rem',
                  }}
                  onClick={handleClick}
                />
                <Button disabled={uploading} onClick={handleClick}>
                  Change Image
                </Button>
                <Column justifyContent="flex-start" style={{ flex: '1' }}>
                  {uploading && <Spinner size={20} />}
                </Column>
              </Row>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
              />

              {fileError && (
                <ErrorBox
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                  }}
                >
                  {fileError}
                </ErrorBox>
              )}
              <SizedBox height={20} />
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  label="First Name"
                  placeholder="Enter your first name"
                  {...formik.getFieldProps('firstName')}
                  type="text"
                  error={getFieldError(
                    formik.errors.firstName,
                    formik.touched.firstName,
                  )}
                  disabled={loadingProfile}
                />
                <TextField
                  label="Last Name"
                  placeholder="Enter your last name"
                  {...formik.getFieldProps('lastName')}
                  type="text"
                  error={getFieldError(
                    formik.errors.lastName,
                    formik.touched.lastName,
                  )}
                  disabled={loadingProfile}
                />
                {/* <TextField
        label="Email address"
        placeholder="Enter your email address"
        readOnly
      /> */}

                <Row justifyContent="flex-end">
                  <Button type="submit" disabled={loadingProfile}>
                    Update Profile
                  </Button>
                </Row>
              </form>
            </Fragment>
          )}
        </Card>
      </Column>
      {renderModals()}
    </Row>
  );
};
