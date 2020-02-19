import React from 'react';
import useRest from 'q3-ui-rest';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import AddNote from './add';
import DisplayNotes from '../../components/display';
import Note from './note';

export const getAuthor = (v) => {
  if (!v || !v.createdBy) return null;
  return `${v.createdBy.firstName} ${v.createdBy.lastName}`;
};

const Notes = ({ collectionName, id }) => {
  const {
    post,
    remove,
    patch,
    fetching,
    fetchingError,
    thread = [],
  } = useRest({
    url: `/${collectionName}/${id}/thread`,
    key: 'thread',
    pluralized: 'thread',
    runOnInit: true,
  });

  const key = 'thread';
  const auth = useAuth(collectionName);
  const { t } = useTranslation('labels');
  const args = {};

  if (!auth.canSeeSub(key)) return t('commentsDisabled');
  if (auth.canEditSub(key)) args.onUpdate = patch;
  if (auth.canDeleteSub(key)) args.onDelete = remove;

  return (
    <Box>
      <DisplayNotes
        loading={fetching}
        error={fetchingError}
        errorLabel={t('notesError')}
      >
        {thread.map((v) => (
          <Note
            key={v.id}
            author={getAuthor(v)}
            {...args}
            {...v}
          />
        ))}
      </DisplayNotes>
      <AddNote
        show={auth.canCreateSub(key)}
        onSubmit={post}
      />
    </Box>
  );
};

Notes.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Notes;
