import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { useTranslation } from 'q3-ui-locale';
import Alert from '@material-ui/lab/Alert';

const AddNote = ({ count, onSubmit, show }) => {
  const { t } = useTranslation('descriptions');

  if (show)
    return (
      <Form onSubmit={onSubmit} restart>
        <Field
          name="message"
          type="text"
          multiline
          rows={4}
          xl={12}
          lg={12}
        />
      </Form>
    );

  if (!count)
    return (
      <Alert severity="info">{t('noNotesPosted')}</Alert>
    );

  return null;
};

AddNote.propTypes = {
  count: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

AddNote.defaultProps = {
  count: 0,
  show: false,
};

export default AddNote;
