import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import Rest from 'q3-ui-test-utils/lib/rest';
import useFixtureData from './useFixtureData';
import data from './data.json';

const ApiMock = ({ children, delay }) => {
  const { data: segments, update: updateSegments } =
    useFixtureData(data);

  return (
    <Rest
      define={(mockApiInstance) => {
        mockApiInstance
          .onGet(/system-segments/)
          .reply(200, {
            segments,
          });

        mockApiInstance
          .onPut(/system-segments/)
          .reply((args) => [
            200,
            {
              segments: updateSegments(
                JSON.parse(args.data),
              ),
            },
          ]);

        return mockApiInstance;
      }}
      delay={delay}
    >
      {children}
    </Rest>
  );
};

ApiMock.defaultProps = {
  children: null,
  delay: 0,
};

ApiMock.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
};

export default ApiMock;
