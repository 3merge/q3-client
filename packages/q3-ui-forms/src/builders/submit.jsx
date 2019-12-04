import React from 'react';
import PropTypes from 'prop-types';
import Form from 'q3-ui/lib/form';
import { useAuth } from 'q3-ui-permissions';
import FromJson, { findValidations } from './fromJson';

const getCreatedByMeta = (data) => {
  if (!data) return null;
  return data.createdBy === 'object'
    ? data.createdBy.id
    : data.createdBy;
};

const FormBuilder = ({
  data,
  title,
  subtitle,
  collectionName,
  onSubmit,
  isNew,
  children,
  fields,
  ignoreAuth,
  deriveSubtitle,
  ...rest
}) => {
  let readOnly = false;
  const authProps = {};

  const createdBy = getCreatedByMeta(data);
  const { isDisabled, canEdit, canCreate } = useAuth(
    collectionName,
    createdBy,
  );

  if (!ignoreAuth) {
    authProps.authFn = isDisabled;

    if (isNew) {
      authProps.isNew = true;
      readOnly = !canCreate;
    } else {
      readOnly = !canEdit;
    }
  }

  return (
    <Form
      title={title}
      subtitle={deriveSubtitle ? title : subtitle}
      readOnly={readOnly}
      onSubmit={onSubmit}
      validationSchema={findValidations(fields)}
      initialValues={data}
      {...rest}
    >
      {(all) =>
        children ? (
          children(authProps, all)
        ) : (
          <FromJson
            json={{
              createdBy,
              collectionName,
              isNew,
              fields,
            }}
          />
        )
      }
    </Form>
  );
};

FormBuilder.propTypes = {
  data: PropTypes.shape({}).isRequired,
  schema: PropTypes.shape({}).isRequired,
  collectionName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  deriveSubtitle: PropTypes.bool,
  isNew: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  fields: PropTypes.shape({}).isRequired,
  ignoreAuth: PropTypes.bool,
};

FormBuilder.defaultProps = {
  ignoreAuth: false,
  deriveSubtitle: false,
  subtitle: null,
};

export const iterateSchemas = (fieldset = {}, opts = {}) =>
  Object.entries(fieldset).map(([key, v], i) => ({
    to: i === 0 ? '/' : `/${key}`,
    label: key,
    component: () => (
      <FormBuilder title={key} fields={v} {...opts} />
    ),
  }));

export default FormBuilder;
