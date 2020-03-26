import React from 'react';
import PropTypes from 'prop-types';
import useContent from './useContent';
import Display from '../../components/display';

const Documentation = ({ filepath }) => {
  const { content, loading, error } = useContent(filepath);
  return (
    <Display
      loading={loading}
      error={error}
      errorLabel="documentationError"
      emptyLabel="documentationEmpty"
    >
      <div
        // eslint-disable-next-line
            dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </Display>
  );
};

Documentation.propTypes = {
  filepath: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,
};

export default Documentation;
