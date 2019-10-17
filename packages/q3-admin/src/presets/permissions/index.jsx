import React from 'react';
import { Router } from '@reach/router';
import Form from 'q3-ui/form';
import { DesktopSelect } from 'q3-ui/inputs';
import Transfer from 'q3-ui/transfer';
import useRest from 'q3-ui-rest';
import Detail from '../../templates/detail';
import List from '../../templates/list';

const ROOT = 'permissions';
const OPS = ['Read', 'Create', 'Update', 'Delete'];
const OWNERSHIP = ['Any', 'Shared', 'Own'];

const transformFlatArray = (arr = []) =>
  arr.map((value) => ({
    label: value,
    value,
  }));

const PermissionsList = (props) => (
  <List
    {...props}
    root={`/${ROOT}`}
    name={ROOT}
    columns={['role', 'op', 'coll']}
  />
);

const PermissionsAdd = () => null;

const PermissionsUpdate = ({
  permission,
  conditions,
  roles,
  collections,
  patch,
}) => (
  <Form
    title="grant"
    initialValues={permission}
    onSubmit={patch}
  >
    {() => (
      <>
        <DesktopSelect
          name="op"
          options={transformFlatArray(OPS)}
          required
        />
        <DesktopSelect
          name="coll"
          options={transformFlatArray(
            Object.keys(collections),
          )}
          required
        />
        <DesktopSelect
          name="ownership"
          options={transformFlatArray(OWNERSHIP)}
        />
        <DesktopSelect
          name="role"
          options={transformFlatArray(roles)}
          required
        />
        <DesktopSelect
          name="condition"
          options={transformFlatArray(conditions)}
        />
        <Transfer
          name="fields"
          options={collections[permission.coll]}
        />
      </>
    )}
  </Form>
);

const PermissionsDetail = (props) => {
  const {
    collections = {},
    conditions = [],
    roles = [],
  } = useRest({
    runOnInit: true,
    url: 'system',
    key: 'sys',
  });

  return (
    <Detail
      {...props}
      pathToTitle="permission.coll"
      name={ROOT}
      views={({ permission, patch, id }) => [
        {
          label: 'general',
          component: () => (
            <PermissionsUpdate
              permission={permission}
              collections={collections}
              conditions={conditions}
              roles={roles}
              put={patch(id)}
            />
          ),
        },
      ]}
    />
  );
};

export default () => (
  <Router basepath="/permissions">
    <PermissionsList path="/" />
    <PermissionsDetail path=":id/*" />
  </Router>
);
