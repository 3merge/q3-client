import React from 'react';
import useRest from 'q3-ui-rest';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

const Notes = ({ collectionName, id }) => {
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
    if (fetching || fetchingError || !thread.length)
      return <CircularProgress />;

    return thread.map((v) => <p>{v.message}</p>);
  };

  return (
    <>
      {renderNotes()}
      <Divider />
      <Form initialValues={{ message: '' }} onSubmit={post}>
        <Field
          name="message"
          type="text"
          multiline
          rows={4}
        />
      </Form>
    </>
  );
};

Notes.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Notes;
