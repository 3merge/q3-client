import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Create from '../Create';
import Sort from '../Sort';
import Timeline from '../Timeline';

const Comments = ({ collectionName, id }) => {
  const { post, comments = [], ...rest } = useRest({
    url: `/${collectionName}/${id}/comments`,
    key: 'comments',
    pluralized: 'comments',
    runOnInit: true,
  });

  // FETCHING
  // ERROR

  return (
    <Sort>
      {(state, ToggleRenderer) => (
        <>
          <Create
            collectionName={collectionName}
            id={id}
            onSubmit={post}
          >
            {ToggleRenderer}
          </Create>
          <Timeline
            {...rest}
            post={post}
            data={comments}
            asc={state}
            collectionName={collectionName}
            id={id}
          />
        </>
      )}
    </Sort>
  );
};

Comments.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Comments;
