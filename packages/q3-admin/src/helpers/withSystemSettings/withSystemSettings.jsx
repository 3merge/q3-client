import React from 'react';
import useSystem from '../../hooks/useSystem';

const withSystemSettings = (Component) => (props) => {
  const { init, settings, updateSys } = useSystem(
    // eslint-disable-next-line
    props?.collectionName,
  );

  return init ? (
    <Component
      {...props}
      {...settings}
      updateSys={updateSys}
    />
  ) : null;
};

export default withSystemSettings;
