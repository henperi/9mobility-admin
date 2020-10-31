import React from 'react';
import { PageBody } from '../../components/UiKit/PageBody';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { TopBar } from '../../components/TopBar';
import { UpdateProfile } from './UpdateProfile';
import { ChangePassword } from './ChangePassword';

export const Settings = () => {
  return (
    <>
      <TopBar name="Settings" />
      <PageBody>
        <SizedBox height={24} />
        <UpdateProfile />
        <SizedBox height={50} />
        <ChangePassword />
      </PageBody>
    </>
  );
};
