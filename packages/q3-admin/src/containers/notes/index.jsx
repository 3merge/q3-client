import React from 'react';
import useRest from 'q3-ui-rest';
import { useTranslation } from 'q3-ui-locale';
import { useAuth } from 'q3-ui-permissions';
import { orderBy } from 'lodash';
import AddNote from './add';
import { Definitions } from '../state';
import DisplayNotes from '../../components/display';
import Note from './note';

export const getAuthor = (v) => {
  if (!v) return null;
  if (v.author) return v.author;
  return v.createdBy
    ? `${v.createdBy.firstName} ${v.createdBy.lastName}`
    : null;
};

const Notes = () => {
  const { collectionName, id } =
    React.useContext(Definitions);

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
    <DisplayNotes
      loading={fetching}
      error={fetchingError}
      errorLabel={t('notesError')}
    >
      <AddNote
        show={auth.canCreateSub(key)}
        onSubmit={post}
      />

      {orderBy(thread, ['createdAt'], ['desc']).map(
        (v, idx) => (
          <Note key={`${v.id}${idx}`} {...args} {...v} />
        ),
      )}
    </DisplayNotes>
  );
};

Notes.propTypes = {};

export default Notes;
