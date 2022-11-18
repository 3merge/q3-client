import React from 'react';
import PropTypes from 'prop-types';
import {
  useServerSideEvents,
  useServerSideEventsConnection,
} from 'q3-ui-sse';
import ServerSideEventsContext from '../ServerSideEventsContext';
import Loader from '../../components/loader';
import useCounters from '../../hooks/useCounters';

const ServerSideEventsProvider = ({ children }) => {
  useServerSideEvents();

  const state = useServerSideEventsConnection();
  const counters = useCounters();

  const InnerComponents = React.useMemo(() => children, []);

  return (
    <ServerSideEventsContext.Provider
      // eslint-disable-next-line
      value={{
        ...state,
        counters,
      }}
    >
      <Loader />
      {InnerComponents}
    </ServerSideEventsContext.Provider>
  );
};

ServerSideEventsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ServerSideEventsProvider;
