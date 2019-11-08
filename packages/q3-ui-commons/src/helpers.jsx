import React from 'react';
import PropTypes from 'prop-types';
import Form from 'q3-ui/form';
import * as yup from 'yup';
import { useAuth } from 'q3-ui-permissions';

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
      { type: El, expected, if: conditional, ...other },
    ]) => {
      let include = true;
      if (conditional) {
        include = conditional(values);
      }

      if (typeof other.options === 'function')
        Object.assign(other, {
          options: other.options(values),
        });

      return include ? (
        <El
          key={k}
          type={expected || 'text'}
          name={k}
          {...opts}
          {...other}
        />
      ) : null;
    },
  );

const getCreatedByMeta = (data) =>
  typeof data.createdBy === 'object'
    ? data.createdBy.id
    : data.createdBy;

const Q3FormBuilder = ({
  data,
  schema,
  collectionName,
  onSubmit,
  title,
  isNew,
  ...rest
}) => {
  const createdBy = getCreatedByMeta(data);
  const { isDisabled, canEdit, canCreate } = useAuth(
    collectionName,
    createdBy,
  );

  return (
    <Form
      title={title}
      readOnly={isNew ? !canCreate : !canEdit}
      onSubmit={onSubmit}
      validationSchema={findValidations(schema)}
      initialValues={data}
      {...rest}
    >
      {({ values }) =>
        appendFields(
          schema,
          {
            authFn: isDisabled,
            isNew,
          },
          values,
        )
      }
    </Form>
  );
};

Q3FormBuilder.propTypes = {
  data: PropTypes.shape({}).isRequired,
  schema: PropTypes.shape({}).isRequired,
  collectionName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
};

export default Q3FormBuilder;
