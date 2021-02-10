import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { matchAgainstUppercase } from '../helpers';

const ConfirmForm = ({ phrase, ...props }) => (
  <Form restart {...props}>
    <Field
      autoFocus
      validate={yup
        .string()
        .test(matchAgainstUppercase(phrase))}
      name="confirmPhrase"
      type="text"
    />
  </Form>
);

ConfirmForm.defaultProps = {
  phrase: 'confirm',
};

ConfirmForm.propTypes = {
  phrase: PropTypes.string,
};

export default ConfirmForm;
