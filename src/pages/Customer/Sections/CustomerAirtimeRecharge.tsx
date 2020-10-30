import React from 'react';
// import { FaWallet } from 'react-icons/fa';

import { Card } from '../../../components/UiKit/Card';
import { Column } from '../../../components/UiKit/Column';
import { SimpleTable } from '../../../components/UiKit/Table';

export const CustomerAirtimeRecharge = () => {
  return (
    <>
      <Column>
        <Card style={{ padding: '1.5rem' }} fullWidth>
          <SimpleTable
            columns={[
              'S//N',
              'Transaction Tyoe',
              'Account ID',
              'Channel',
              'Amount',
              'Status',
              'Transaction date',
            ]}
            // data={paymentHistory}
            // loading={loading}
          />
          Airtime Recharge
        </Card>
      </Column>
    </>
  );
};
