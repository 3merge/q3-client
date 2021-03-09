import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';

const DARK = 'dark';
const LIGHT = 'light';
const LOCAL_STORAGE_NAME = 'q3-mode';

export const ModeContext = React.createContext({
  value: LIGHT,
});

const Mode = ({ children, initialType }) => {
  const [type, setType] = React.useState(
    browser.proxyLocalStorageApi(
      'getItem',
      LOCAL_STORAGE_NAME,
    ) || initialType,
  );

  const isLight = type === LIGHT;
  const toggle = () => setType(isLight ? DARK : LIGHT);

  React.useEffect(() => {
    browser.proxyLocalStorageApi(
      'setItem',
      LOCAL_STORAGE_NAME,
      type,
    );
  }, [type]);

  return (
    <ModeContext.Provider
      value={{
        type,
        setType,
        toggle,
        isLight,
      }}
    >
      {children(type)}
    </ModeContext.Provider>
  );
};

Mode.defaultProps = {
  initialType: LIGHT,
};

Mode.propTypes = {
  children: PropTypes.func.isRequired,
  initialType: PropTypes.oneOf([LIGHT, DARK]),
};

export default Mode;
