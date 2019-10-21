import React from 'react';
import Thread from 'q3-ui/thread';
import Input from 'q3-ui/inputs';
import useRest from 'q3-ui-rest';
import Box from '@material-ui/core/Box';
import { useAuth } from 'q3-ui-permissions';
import CallToAction from 'q3-ui/callToAction';
import ServerError from 'q3-ui/error';
import { useTranslation } from 'react-i18next';
import {
  Capture,
  Delete as DeleteConfirmation,
} from 'q3-ui/dialogs';
import Create from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import { TimelineSkeleton } from 'q3-ui/timeline';
import noNotesImg from '../../images/no-notes.png';

const RemoveThread = ({ next, userID }) => {
  const { canDelete, matchID } = useAuth('q3-api-notes');
  return canDelete && matchID(userID) ? (
    <div
      style={{
        position: 'absolute',
        left: 'calc(100% + 1rem)',
        top: '-3rem',
      }}
    >
      <DeleteConfirmation next={next} />
    </div>
  ) : null;
};

export default ({ id }) => {
  const { t } = useTranslation();
  const {
    notes,
    post,
    remove,
    fetching,
    fetchingError,
  } = useRest({
    url: `/notes?topic=${id}`,
    key: 'notes',
    runOnInit: true,
  });

  const renderNotes = () => {
    if (fetching) return <TimelineSkeleton />;
    if (fetchingError) return <ServerError />;

    if (!notes.length)
      return (
        <Paper>
          <CallToAction
            imgSrc={noNotesImg}
            title={t('titles:noNotes')}
            description={t('descriptions:noNotes')}
          />
        </Paper>
      );

    return (
      <Thread
        entries={notes}
        toolbar={(entry) => (
          <RemoveThread
            userID={entry.user.id}
            next={remove(entry.id)}
          />
        )}
      />
    );
  };

  return (
    <>
      {!fetchingError && (
        <Box align="right">
          <Capture
            asButton
            title="newNote"
            onSubmit={post}
            icon={Create}
          >
            <Input name="comment" multiline rows={8} />
          </Capture>
        </Box>
      )}
      {renderNotes()}
    </>
  );
};
