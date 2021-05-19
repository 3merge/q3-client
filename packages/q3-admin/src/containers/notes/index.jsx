import React from 'react';
import useRest from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import Dialog from 'q3-ui-dialog';
import ForumIcon from '@material-ui/icons/Forum';
import AddNote from './add';
import { Definitions } from '../state';
import DisplayNotes from '../../components/display';
import Note from './note';
import useActionBar from '../../hooks/useActionBar';

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
    <Dialog
      title="notes"
      variant="drawer"
      renderContent={() => (
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
      )}
      renderTrigger={(onClick) =>
        useActionBar({
          sort: 2,
          label: 'notes',
          icon: ForumIcon,
          onClick,
        })
      }
    />
  );
};

Notes.propTypes = {};

export default Notes;
