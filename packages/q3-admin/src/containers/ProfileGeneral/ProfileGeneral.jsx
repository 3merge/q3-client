import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { handleFormData } from 'q3-ui-forms/lib/helpers';
import useProfileForm from '../../hooks/useProfileForm';

export const generateInitialValues = (
  state,
  additionalKeys = [],
) => {
  const keys = [
    'id',
    'email',
    'firstName',
    'lastName',
    ...additionalKeys,
  ];

  return pick(
    Object.assign(
      keys.reduce((acc, next) =>
        Object.assign(acc, {
          [next]: '',
        }),
      ),
      state,
    ),
    keys,
  );
};

const ProfileGeneral = ({
  fields,
  fieldKeys,
  formProps,
}) => {
  const { initialValues, onSubmit } = useProfileForm();

  return (
    <Form
      {...formProps}
      showSuccessMessage
      initialValues={generateInitialValues(
        initialValues,
        fieldKeys,
      )}
      onSubmit={handleFormData(onSubmit)}
    >
      <Field name="firstName" type="text" required xl={6} />
      <Field name="lastName" type="text" required xl={6} />
      <Field name="email" type="email" required xl={6} />
      {fields}
    </Form>
  );
};

ProfileGeneral.propTypes = {
  fields: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  fieldKeys: PropTypes.arrayOf(PropTypes.string),
  formProps: PropTypes.shape({
    // eslint-disable-next-line
    marshal: PropTypes.object,
    // eslint-disable-next-line
    translate: PropTypes.object,
    marshalSelectively: PropTypes.bool,
  }),
};

ProfileGeneral.defaultProps = {
  fields: null,
  fieldKeys: [],
  formProps: {},
};

export default ProfileGeneral;
