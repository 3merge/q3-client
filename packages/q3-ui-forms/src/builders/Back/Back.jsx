import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import { DispatcherState } from '../../FormsContext';

const Back = ({ label, left, onClick }) => {
  const { t } = useTranslation();
  const { onReset } = React.useContext(DispatcherState);

  return (
    <Button
      type="button"
      onClick={onClick || onReset}
      style={{
        [left ? 'marginLeft' : 'marginRight']: '0.25rem',
      }}
    >
      {t(`labels:${label}`)}
    </Button>
  );
};

Back.propTypes = {
  /**
   * Determines internal margin direction
   */
  left: PropTypes.bool,

  /**
   * Text to display inside of this button
   */
  label: PropTypes.string.isRequired,

  /**
   * Will override onReset functionality.
   */
  onClick: PropTypes.func,
};

Back.defaultProps = {
  left: false,
  onClick: null,
};

export default Back;
