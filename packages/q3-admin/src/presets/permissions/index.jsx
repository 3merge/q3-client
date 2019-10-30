import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Form from 'q3-ui/form';
import { DesktopSelect } from 'q3-ui/inputs';
import Transfer from 'q3-ui/transfer';
import useRest from 'q3-ui-rest';
import { useAuth, Protected } from 'q3-ui-permissions';
import Detail from '../../templates/detail';
import List from '../../templates/list';

const ROOT = 'q3-api-permissions';
const OPS = ['Read', 'Create', 'Update', 'Delete'];
const OWNERSHIP = ['Any', 'Own'];

const RESOURCE = {
  resourceName: 'permissions',
  resourceNameSingular: 'permission',
};

const FIELDS = {
  op: '',
  coll: '',
  ownership: '',
  fields: '',
  role: '',
  condition: '',
};

const SYS_PROPS = {
  collections: PropTypes.shape({}),
  conditions: PropTypes.arrayOf(PropTypes.string),
  fieldOptions: PropTypes.arrayOf(PropTypes.string),
  roles: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.func,
};

const SYS_DEFAULT = {
  collections: {},
  conditions: [],
  roles: [],
  fieldOptions: [],
  isDisabled: null,
};

const transformFlatArray = (arr = []) =>
  arr.map((value) => ({
    label: value,
    value,
  }));

const PermissionFormFields = ({
  conditions,
  roles,
  collections,
  fieldOptions,
  isDisabled,
  isNew,
}) => (
  <>
    <DesktopSelect
      name="op"
      options={transformFlatArray(OPS)}
      authFn={isDisabled}
      isNew={isNew}
      required
    />
    <DesktopSelect
      name="coll"
      options={transformFlatArray(Object.keys(collections))}
      authFn={isDisabled}
      isNew={isNew}
      required
    />
    <DesktopSelect
      name="ownership"
      options={transformFlatArray(OWNERSHIP)}
      authFn={isDisabled}
      isNew={isNew}
    />
    <DesktopSelect
      name="role"
      options={transformFlatArray(roles)}
      authFn={isDisabled}
      isNew={isNew}
      required
    />
    {/*
    <DesktopSelect
      name="condition"
      options={transformFlatArray(conditions)}
      authFn={isDisabled}
      isNew={isNew}
    /> */}
    <Transfer
      name="fields"
      options={fieldOptions}
      authFn={isDisabled}
      isNew={isNew}
    />
  </>
);

PermissionFormFields.propTypes = SYS_PROPS;
PermissionFormFields.defaultProps = SYS_DEFAULT;

const withFieldOptions = (props) => {
  const InnerFields = ({ values: { coll } }) => (
    <PermissionFormFields
      fieldOptions={get(props, `collections.${[coll]}`, [])}
      {...props}
    />
  );

  InnerFields.propTypes = {
    values: PropTypes.shape({
      coll: PropTypes.string,
    }).isRequired,
  };

  return InnerFields;
};

const PermissionsCreate = ({
  canCreate,
  post,
  ...rest
}) => (
  <Form
    title="create"
    dividers={false}
    initialValues={FIELDS}
    onSubmit={post}
    readOnly={!canCreate}
  >
    {withFieldOptions({
      isNew: true,
      ...rest,
    })}
  </Form>
);

PermissionsCreate.propTypes = {
  canCreate: PropTypes.bool.isRequired,
  post: PropTypes.func.isRequired,
};

const PermissionsList = (props) => {
  const auth = useAuth('q3-api-permissions');
  const sys = useRest({
    runOnInit: true,
    url: 'system',
    key: 'permissions',
  });

  Object.assign(sys, auth);

  return (
    <List
      {...props}
      {...RESOURCE}
      name={ROOT}
      columns={['role', 'op', 'coll']}
      coll="q3-api-permissions"
      addComponent={({ post }) => (
        <PermissionsCreate
          {...auth}
          {...sys}
          {...props}
          post={post}
        />
      )}
    />
  );
};

const PermissionsUpdate = ({
  permission,
  patch,
  canEdit,
  ...rest
}) => (
  <>
    <Form
      title="grant"
      onSubmit={patch}
      initialValues={{ ...FIELDS, ...permission }}
      readOnly={!canEdit}
    >
      {withFieldOptions(rest)}
    </Form>
  </>
);

PermissionsUpdate.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  patch: PropTypes.func.isRequired,
  permission: PropTypes.shape({
    coll: PropTypes.string,
    op: PropTypes.string,
    fields: PropTypes.string,
    role: PropTypes.string,
    condition: PropTypes.string,
  }).isRequired,
};

const PermissionDetail = (props) => {
  const auth = useAuth('q3-api-permissions');
  const sys = useRest({
    runOnInit: true,
    url: 'system',
    key: 'permissions',
  });

  return (
    <Detail
      {...props}
      {...RESOURCE}
      name={ROOT}
      pathToTitle="permission.coll"
      coll="q3-api-permissions"
      views={({ permission, patch, id }) => [
        {
          to: '/',
          label: 'general',
          component: () => (
            <PermissionsUpdate
              {...props}
              {...sys}
              {...auth}
              permission={permission}
              patch={patch(id)}
            />
          ),
        },
      ]}
    />
  );
};

export default PermissionsList;
export { PermissionDetail };
