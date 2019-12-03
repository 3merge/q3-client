import React from 'react';
import PropTypes from 'prop-types';
import Form from 'q3-ui/lib/form';
import { useAuth } from 'q3-ui-permissions';
import FromJson from './fromJson';

const getCreatedByMeta = (data) => {
  if (!data) return null;
  return data.createdBy === 'object'
    ? data.createdBy.id
    : data.createdBy;
};

const FormBuilder = ({
  data,
  title,
  collectionName,
  ignoreAuth,
  onSubmit,
  isNew,
  children,
  fields,
  validationSchema,
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
      readOnly={readOnly}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
  isNew: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FormBuilder;
