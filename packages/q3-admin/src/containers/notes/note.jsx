import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import { useToggle } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';
import { string } from 'q3-ui-helpers';

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
  createdAt,
  updatedAt,
  author,
  id,
}) => {
  const { t } = useTranslation('labels');
  const { toggle, state } = useToggle(false);
  const { blockquote } = useStyles();

  const created = string.toDate(createdAt);
  const updated = string.toDate(updatedAt);

  const getDateString = () =>
    created !== updated && updated
      ? `${created} (revised ${updated})`
      : created;

  const getAuthor = () =>
    author ? `${author} posted on` : 'Posted on';

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

      <cite
        style={{
          display: 'block',
          fontStyle: 'italic',
          fontSize: '0.833rem',
        }}
      >
        &mdash; {getAuthor()} {getDateString()}
      </cite>
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
        xl={12}
        lg={12}
        rows={15}
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
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

Note.defaultProps = {
  onUpdate: null,
  onDelete: null,
};

export default Note;
