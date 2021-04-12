import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';

const DARK = 'dark';
const LIGHT = 'light';
const LOCAL_STORAGE_NAME = 'q3-mode';

export const ModeContext = React.createContext({
  value: LIGHT,
});

const Mode = ({ children, initialType, enableToggle }) => {
  let prev =
    browser.proxyLocalStorageApi(
      'getItem',
      LOCAL_STORAGE_NAME,
    ) || initialType;

  if (!enableToggle) prev = initialType;

  const [type, setType] = React.useState(prev);
  const isLight = type === LIGHT;

  const toggle = () =>
    enableToggle ? setType(isLight ? DARK : LIGHT) : null;

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
  enableToggle: true,
  initialType: LIGHT,
};

Mode.propTypes = {
  children: PropTypes.func.isRequired,
  initialType: PropTypes.oneOf([LIGHT, DARK]),
  enableToggle: PropTypes.bool,
};

export default Mode;
