import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';

export const ModeContext = React.createContext({
  value: 'light',
});

const Mode = ({ children, initialType }) => {
  const [type, setType] = React.useState(
    browser.proxyLocalStorageApi('getItem', 'q3-mode') ||
      initialType,
  );

  const isLight = type === 'light';
  const toggle = () => setType(isLight ? 'dark' : 'light');

  React.useEffect(() => {
    browser.proxyLocalStorageApi(
      'setItem',
      'q3-mode',
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
  initialType: 'light',
};

Mode.propTypes = {
  children: PropTypes.func.isRequired,
  initialType: PropTypes.oneOf(['light', 'dark']),
};

export default Mode;
