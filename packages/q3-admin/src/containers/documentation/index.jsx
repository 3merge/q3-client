import React from 'react';
import PropTypes from 'prop-types';
import useContent from './useContent';
import Display from './display';
import Wrapper from './wrapper';

const Documentation = ({ filepath }) => {
  const { content, loading, error } = useContent(filepath);
  return (
    <Wrapper>
      {() => (
        <Display
          loading={loading}
          error={error}
          data={content}
        />
      )}
    </Wrapper>
  );
};

Documentation.propTypes = {
  filepath: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,
};

export default Documentation;
