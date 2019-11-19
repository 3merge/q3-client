import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Form from 'q3-ui/lib/form';
import { useAuth } from 'q3-ui-permissions';

const getCreatedByMeta = (data) => {
  if (!data) return null;
  return data.createdBy === 'object'
    ? data.createdBy.id
    : data.createdBy;
};

const invokeFn = (fn, args, output) => {
  if (!fn || typeof fn !== 'function') return output;
  return fn(args) ? output : null;
};

export const findValidations = (fields = {}) =>
  yup.object().shape(
    Object.entries(fields).reduce(
      (acc, [key, { validate }]) => {
        if (validate) acc[key] = validate;
        return acc;
      },
      {},
    ),
  );

export const appendFields = (
  fields = {},
  opts = {},
  values,
) =>
  Object.entries(fields).map(
    ([
      k,
      {
        type: El,
        expected = 'text',
        if: conditional,
        ...other
      },
    ]) => {
      if (typeof other.options === 'function')
        Object.assign(other, {
          options: other.options(values),
        });

      const args = {
        key: k,
        type: expected,
        name: k,
        ...opts,
        ...other,
      };

      return invokeFn(
        conditional,
        values,
        <El {...args} />,
      );
    },
  );

const FormBuilder = ({
  data,
  schema,
  title,
  collectionName,
  ignoreAuth,
  onSubmit,
  isNew,
  children,
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
      validationSchema={findValidations(schema)}
      initialValues={data}
      {...rest}
    >
      {({ values }) =>
        children
          ? children(authProps, values)
          : appendFields(schema, authProps, values)
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
