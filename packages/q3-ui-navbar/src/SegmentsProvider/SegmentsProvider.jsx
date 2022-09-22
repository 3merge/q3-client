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
  /**
   * Always render `NavBar` inside this Provider.
   * In apps where you'll want to reference segments elsewhere,
   * wrap higher in the component tree.
   */
  children: PropTypes.node,

  /**
   * Control what displays as the segments fetch over the API.
   */
  fallback: PropTypes.elementType,

  /**
   * Typically, this will be an array of unique user role types
   * and will match the access control file on the server.
   */
  visibilityOptions: PropTypes.arrayOf([PropTypes.string]),
};

export default SegmentsProvider;
