import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';
import Authorship from 'q3-ui/lib/authorship';

const useStyles = makeStyles(() => ({
  blockquote: {
    textTransform: 'none',
    '&.Mui-disabled': {
      color: '#999 !important',
    },
  },
}));

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
  const { blockquote } = useStyles();

  return !state ? (
    <Box my={1}>
      <Button
        component="blockquote"
        id={id}
        onClick={toggle}
        disabled={!onUpdate}
        className={blockquote}
      >
        {message}
      </Button>

      <Authorship author={author} date={date} />
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
        name="message"
        rows={5}
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
