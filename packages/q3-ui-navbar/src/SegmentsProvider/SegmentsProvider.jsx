import React from 'react';
import PropTypes from 'prop-types';
import SegmentsContext from '../SegmentsContext';
import SegmentsLoadingScreen from '../SegmentsLoadingScreen';
import useSegmentsFetch from '../useSegmentsFetch';

const SegmentsProvider = ({
  children,
  fallback: Fallback,
}) => {
  const { data, enabled, init } = useSegmentsFetch();
  const storeValue = React.useMemo(
    () => ({
      data,
      enabled,
    }),
    [data],
  );

  return init ? (
    <SegmentsContext.Provider value={storeValue}>
      {children}
    </SegmentsContext.Provider>
  ) : (
    <Fallback />
  );
};

SegmentsProvider.defaultProps = {
  children: null,
  fallback: SegmentsLoadingScreen,
};

SegmentsProvider.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.elementType,
};

export default SegmentsProvider;
