import React from 'react';
import useRest from 'q3-ui-rest';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useAuth } from 'q3-ui-permissions';
import AddNote from './add';
import DisplayNotes from './display';
import Note from './note';

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
  const args = {};

  if (!auth.canSeeSub(key)) return null;
  if (auth.canEditSub(key)) args.onUpdate = patch;
  if (auth.canDeleteSub(key)) args.onDelete = remove;

  return (
    <Box>
      <DisplayNotes
        loading={fetching}
        error={fetchingError}
      >
        {thread.map((v) => (
          <Note key={v.id} {...args} {...v} />
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
