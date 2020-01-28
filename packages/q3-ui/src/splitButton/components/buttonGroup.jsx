import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroupMui from '@material-ui/core/ButtonGroup';
import { ArrowDropDown } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

const ButtonGroup = ({
  id,
  toggleOpenState,
  anchorRef,
  onClick,
  label,
  disabled,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <ButtonGroupMui
      aria-label={t('labels:multiActionList')}
      variant="contained"
      color="primary"
      ref={anchorRef}
      disabled={disabled || loading}
    >
      <Button
        size="large"
        onClick={onClick}
        style={{ borderRight: '1px solid #FFF' }}
      >
        {loading && (
          <CircularProgress
            style={{ marginRight: '0.5rem' }}
            size={16}
          />
        )}
        {label}
      </Button>
      <Button
        size="small"
        color="primary"
        variant="contained"
        aria-haspopup="true"
        aria-owns={id}
        onClick={toggleOpenState}
      >
        <ArrowDropDown />
      </Button>
    </ButtonGroupMui>
  );
};

ButtonGroup.propTypes = {
  /**
   * ID of the offcanvas popper el.
   */
  id: PropTypes.string.isRequired,

  /**
   * Function to open/close popper el.
   */
  toggleOpenState: PropTypes.func.isRequired,

  /**
   * DOM anchor so that popper el can position itself.
   */
  anchorRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,

  /**
   * Click handler for selected option.
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Primary button text.
   */
  label: PropTypes.string.isRequired,

  /**
   * Will disable click actions
   */
  disabled: PropTypes.func,

  /**
   * Will showing a loading icon
   */
  loading: PropTypes.func,
};

ButtonGroup.defaultProps = {
  disabled: false,
  loading: false,
};

export default ButtonGroup;
