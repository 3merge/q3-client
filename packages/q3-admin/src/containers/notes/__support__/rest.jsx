import React from 'react';
import PropTypes from 'prop-types';
import Mock from 'q3-ui-test-utils/lib/rest';
import { genThread } from '../../__fixtures__/thread';

const MockThreadEndpoint = ({ children }) => {
  const [thread, setThread] = React.useState([
    genThread(),
    genThread(),
  ]);

  const defs = (r) => {
    r.onGet('/storybook/1/thread').reply(200, {
      thread,
    });

    r.onPost('/storybook/1/thread').reply(({ data }) => {
      const newThread = thread.concat(JSON.parse(data));
      setThread(newThread);

      return [
        201,
        {
          thread: newThread,
        },
      ];
    });

    r.onDelete('/storybook/1/thread/1').reply(204);
    r.onPatch('/storybook/1/thread/1').reply(200, {
      thread,
    });
  };

  return <Mock define={defs}>{children}</Mock>;
};

MockThreadEndpoint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MockThreadEndpoint;
