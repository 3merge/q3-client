import React from 'react';
import useRest from 'q3-ui-rest';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import SidePanelContent from '../../components/SidePanelContent';
import AddNote from './add';
import { Definitions } from '../state';
import DisplayNotes from '../../components/display';
import Note from './note';

export const getAuthor = (v) => {
  if (!v || !v.createdBy) return null;
  return `${v.createdBy.firstName} ${v.createdBy.lastName}`;
};

const Notes = () => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

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
    <SidePanelContent title="thread" gutters>
      <DisplayNotes
        loading={fetching}
        error={fetchingError}
        errorLabel={t('notesError')}
      >
        <AddNote
          show={auth.canCreateSub(key)}
          onSubmit={post}
        />

        {thread.map((v) => (
          <Note key={v.id} {...args} {...v} />
        ))}
      </DisplayNotes>
    </SidePanelContent>
  );
};

Notes.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Notes;
