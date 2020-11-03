import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from '../../components/UiKit/Row';
import { Button } from '../../components/UiKit/Button';
import { Card } from '../../components/UiKit/Card';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { TextField } from '../../components/UiKit/TextField';
import { SimpleTable } from '../../components/UiKit/Table';
import { useFetch } from '../../hooks/useRequests';
import { IRole } from './interface';

import { generateShortId } from '../../utils/generateShortId';
import { Colors } from '../../themes/colors';

interface IRoles {
  newRoleSuccess: boolean;
  setShowRoleDrawer: any;
  setShowViewRoleDrawer: any;
  setRoleToEdit?: any;
  setRoleToView?: any;
}

export const Roles: FC<IRoles> = ({
  newRoleSuccess,
  setShowRoleDrawer,
  setRoleToEdit,
  setRoleToView,
  setShowViewRoleDrawer,
}) => {
  const history = useHistory();

  const { data, loading, refetch } = useFetch<IRole>(
    `Mobility.OnboardingBackOffice/api/Roles/GetNameAndIds`,
  );

  useEffect(() => {
    if (newRoleSuccess) {
      refetch();
    }
  }, [newRoleSuccess, refetch]);

  const [roles, setRoles] = useState<(string | number | JSX.Element)[][]>();

  useEffect(() => {
    if (data?.result) {
      const result = data.result.map((r, i) =>
        Object.values({
          'S/N': `${i + 1}.`,
          Name: <Column justifyContent="flex-start">{r.name}</Column>,
          action: (
            <Row justifyContent="flex-end" childGap={10}>
              <Button
                onClick={() => {
                  setRoleToView(r);
                  setShowViewRoleDrawer(true);
                }}
                link
                color={Colors.darkGreen}
                key={generateShortId()}
              >
                View
              </Button>

              <Button
                onClick={() => {
                  setRoleToEdit(r);
                  setShowRoleDrawer(true);
                }}
                link
                color={Colors.darkGreen}
                key={generateShortId()}
              >
                Edit
              </Button>
            </Row>
          ),
        }),
      );

      setRoles(result);
    }
  }, [
    data?.result,
    history,
    setRoleToEdit,
    setRoleToView,
    setShowRoleDrawer,
    setShowViewRoleDrawer,
  ]);

  const [onRowClick] = useState<(() => void)[] | (() => void)>();

  return (
    <React.Fragment>
      <Row useAppMargin justifyContent="space-between">
        <Column fullHeight useAppMargin xs={12} md={6}>
          <Row useAppMargin>
            <Column useAppMargin xs={4} md={2}>
              <Button variant="default" fullWidth>
                Filter
              </Button>
            </Column>
            <Column useAppMargin xs={6} md={8}>
              <TextField placeholder="Search Roles" />
            </Column>
          </Row>
        </Column>
        <Column xs={12} md={4} lg={2} justifyContent="flex-end">
          <Button fullWidth onClick={() => setShowRoleDrawer(true)}>
            New Role
          </Button>
        </Column>
      </Row>
      <SizedBox height={24} />

      <Column>
        <Card style={{ padding: '1.5rem' }} fullWidth>
          <SimpleTable
            scrollable
            style={{ display: 'inline-table' }}
            columns={[
              'S//N',
              'Name',
              <Column justifyContent="flex-end" key={generateShortId()}>
                Actions
              </Column>,
            ]}
            loading={loading}
            data={roles}
            onRowClick={onRowClick}
          />
        </Card>
      </Column>
    </React.Fragment>
  );
};
