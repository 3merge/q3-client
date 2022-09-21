import React from 'react';
import PropTypes from 'prop-types';
import SegmentsContext from '../SegmentsContext';
import SegmentsLoadingScreen from '../SegmentsLoadingScreen';
import useSegmentsFetch from '../useSegmentsFetch';

const SegmentsProvider = ({
  children,
  fallback: Fallback,
  visibilityOptions = [],
}) => {
  const { data, enabled, init, update } =
    useSegmentsFetch();

  const storeValue = React.useMemo(
    () => ({
      data,
      enabled,
      update,
      visibilityOptions,
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
  visibilityOptions: [],
};

SegmentsProvider.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.elementType,
  visibilityOptions: PropTypes.arrayOf([PropTypes.string]),
};

export default SegmentsProvider;
