import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Form from 'q3-ui/form';
import { DesktopSelect } from 'q3-ui/inputs';
import Transfer from 'q3-ui/transfer';
import useRest from 'q3-ui-rest';
import { useAuth } from 'q3-ui-permissions';
import Detail from '../../templates/detail';
import List from '../../templates/list';
import Trash from '../trash';

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
  ownershipAliases: [],
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
  aliases,
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
    <DesktopSelect
      name="condition"
      options={transformFlatArray(conditions)}
      authFn={isDisabled}
      isNew={isNew}
    />
    <DesktopSelect
      name="ownershipAliases"
      options={transformFlatArray(aliases)}
      disabled={!aliases.length}
      authFn={isDisabled}
      isNew={isNew}
      multiple
    />
    <Transfer
      name="fields"
      disabled={!fieldOptions.length}
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
      aliases={get(props, `collections.${[coll]}.refs`, [])}
      fieldOptions={get(
        props,
        `collections.${[coll]}.paths`,
        [],
      )}
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
    readOnly={!canCreate}
    title="newPermission"
    subtitle="newPermission"
    dividers={false}
    initialValues={FIELDS}
    onSubmit={post}
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
    pluralized: 'permissions',
    key: 'permission',
  });

  const search = useRest({
    url:
      '/search?coll=q3-api-permissions&fields[]=role&fields[]=op&fields[]=coll',
    key: 'fields',
    pluralized: 'fields',
    runOnInit: true,
  });

  Object.assign(sys, auth);

  return (
    <List
      {...props}
      {...RESOURCE}
      filterProps={{
        render: () => (
          <>
            <DesktopSelect
              name="role"
              options={get(search, 'fields.role', []).map(
                (v) => ({
                  value: v,
                  label: v,
                }),
              )}
            />
            <DesktopSelect
              name="op"
              options={get(search, 'fields.op', []).map(
                (v) => ({
                  value: v,
                  label: v,
                }),
              )}
            />
            <DesktopSelect
              name="coll"
              options={get(search, 'fields.coll', []).map(
                (v) => ({
                  value: v,
                  label: v,
                }),
              )}
            />
          </>
        ),
        initialValues: {
          role: '',
        },
      }}
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
  const sys = useRest({
    runOnInit: true,
    url: 'system',
    pluralized: 'permissions',
    key: 'permission',
  });

  return (
    <Detail
      {...props}
      {...RESOURCE}
      name={ROOT}
      pathToTitle="permission.coll"
      coll="q3-api-permissions"
      views={({ permission, patch, id, ...rest }) => [
        {
          to: '/',
          label: 'general',
          component: () => (
            <PermissionsUpdate
              {...props}
              {...sys}
              {...rest}
              permission={permission}
              patch={patch()}
            />
          ),
        },
      ]}
    />
  );
};

export default PermissionsList;
export { PermissionDetail };
