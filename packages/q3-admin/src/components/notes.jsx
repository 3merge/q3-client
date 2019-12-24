import React from 'react';
import Thread from 'q3-ui/lib/thread';
import useRest from 'q3-ui-rest';
import Tile from 'q3-ui/lib/tile';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TimelineSkeleton } from 'q3-ui/lib/timeline';
import {
  Form,
  Field,
  Next,
} from 'q3-ui-forms/lib/builders';
import { ErrorView, EmptyView } from './list';

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
      <Tile title="addNote">
        <Form
          onSubmit={post}
          initialValues={{ message: '' }}
        >
          <Field
            name="message"
            type="editor"
            multiline
            rows={10}
          />
          <Next label={t('labels:add')} />
        </Form>
      </Tile>
      {renderNotes()}
    </>
  );
};

Notes.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Notes;
