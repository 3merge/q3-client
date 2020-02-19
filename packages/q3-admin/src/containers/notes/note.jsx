import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'useful-state';

const Note = ({
  onUpdate,
  onDelete,
  message,
  date,
  author,
  id,
}) => {
  const { t } = useTranslation('labels');
  const { toggle, state } = useToggle(false);

  return !state ? (
    <Box my={1}>
      <Button
        component="blockquote"
        variant="contained"
        id={id}
        onClick={toggle}
        disabled={!onUpdate}
      >
        {message}
      </Button>
      <Box
        component="cite"
        display="block"
        style={{ fontSize: '0.733rem' }}
      >
        {author} - {moment(date).format('MMM DD, YYYY')}
      </Box>
      <Box pt={1}>
        <Divider />
      </Box>
    </Box>
  ) : (
    <Form
      enableSubmit={false}
      initialValues={{ message }}
      onSubmit={(...args) =>
        onUpdate(id)(...args).then(() => {
          toggle();
        })
      }
    >
      <Field
        type="text"
        multiline
        rows={5}
        name="message"
      />
      <Button type="submit">{t('save')}</Button>
      <Button type="button" onClick={toggle}>
        {t('cancel')}
      </Button>
      {onDelete && (
        <Button type="button" onClick={onDelete(id)}>
          {t('remove')}
        </Button>
      )}
    </Form>
  );
};

Note.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

Note.defaultProps = {
  onUpdate: null,
  onDelete: null,
};

export default Note;
