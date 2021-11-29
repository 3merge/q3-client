import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { useTranslation } from 'q3-ui-locale';
import { matchAgainstUppercase } from '../helpers';

const ConfirmForm = ({ phrase, ...props }) => {
  const { t } = useTranslation('labels');

  return (
    <Form restart {...props}>
      <Field
        autoFocus
        validate={yup
          .string()
          .test(matchAgainstUppercase(phrase))}
        name="confirmPhrase"
        label={t('confirmPhrase', {
          phrase,
        })}
        type="text"
        xl={12}
        lg={12}
        md={12}
      />
    </Form>
  );
};

ConfirmForm.defaultProps = {
  phrase: 'confirm',
};

ConfirmForm.propTypes = {
  phrase: PropTypes.string,
};

export default ConfirmForm;
