import React from 'react';
import Thread from 'q3-ui/lib/thread';
import useRest from 'q3-ui-rest';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TimelineSkeleton } from 'q3-ui/lib/timeline';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Dialog from 'q3-ui-dialog';
import EmptyView from './empty';
import ErrorView from './error';

const Notes = ({ collectionName, id }) => {
  const { t } = useTranslation();
  const {
    post,
    fetching,
    fetchingError,
    thread = [],
  } = useRest({
    url: `/${collectionName}/${id}/thread`,
    key: 'thread',
    pluralized: 'thread',
    runOnInit: true,
  });

  const renderNotes = () => {
    if (fetching) return <TimelineSkeleton />;
    if (fetchingError) return <ErrorView />;
    if (!thread.length) return <EmptyView />;
    return <Thread entries={thread} />;
  };

  return (
    <>
      <Dialog
        title="note"
        renderContent={(close) => (
          <Form
            onSubmit={(values, actions) =>
              post(values, actions).then(close)
            }
            initialValues={{ message: '' }}
          >
            <Field
              name="message"
              type="editor"
              multiline
              rows={10}
            />
          </Form>
        )}
        renderTrigger={(open) => (
          <Button
            onClick={open}
            variant="contained"
            color="primary"
            style={{ float: 'right' }}
          >
            {t('labels:new')}
            <AddIcon />
          </Button>
        )}
      />

      {renderNotes()}
    </>
  );
};

Notes.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Notes;
