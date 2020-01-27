import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Button, ButtonGroupMui } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import Label from '../label';

const ButtonGroup = ({
  id,
  toggleOpenState,
  anchorRef,
  onClick,
  label,
  description,
}) => {
  const { t } = useTranslation();

  return (
    <ButtonGroupMui
      aria-label={t('labels:multiActionList')}
      variant="contained"
      color="primary"
      ref={anchorRef}
    >
      <Button
        size="large"
        onClick={onClick}
        style={{ borderRight: '1px solid #FFF' }}
      >
        <Label label={label} description={description} />
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
   * Supporting button text.
   */
  description: PropTypes.string.isRequired,
};

export default ButtonGroup;
