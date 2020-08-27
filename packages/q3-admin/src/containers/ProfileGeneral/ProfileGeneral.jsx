import React from 'react';
import PropTypes from 'prop-types';
import { get, pick } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { useTranslation } from 'react-i18next';
import { handleFormData } from 'q3-ui-forms/lib/helpers';

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
    get(
      state,
      'profile',
      keys.reduce((acc, next) =>
        Object.assign(acc, {
          [next]: '',
        }),
      ),
    ),
    keys,
  );
};

const ProfileGeneral = ({
  fields,
  fieldKeys,
  formProps,
}) => {
  const { t } = useTranslation();
  const { state, update } = React.useContext(AuthContext);

  const initialValues = generateInitialValues(
    state,
    fieldKeys,
  );

  return (
    <Form
      {...formProps}
      showSuccessMessage
      initialValues={initialValues}
      onSubmit={handleFormData((formData) =>
        update(formData).then(() => ({
          message: t('descriptions:profileUpdated'),
        })),
      )}
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
