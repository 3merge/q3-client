import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { object } from 'q3-ui-helpers';
import { useAllowSubmit } from '../../hooks';

const Next = ({
  children,
  submit,
  size,
  label,
  onClick,
  disabled,
  disableGutters,
  ...rest
}) => {
  const { t } = useTranslation();
  const isSubmittable = useAllowSubmit(disabled);

  const buttonProps = {
    color: 'primary',
    variant: 'contained',
    type: submit ? 'submit' : 'button',
    onClick: submit ? undefined : onClick,
    disabled: !isSubmittable,
    size,
    ...rest,
  };

  return object.isFn(children) ? (
    children(buttonProps)
  ) : (
    <Box display="inline-block" mt={disableGutters ? 0 : 1}>
      <Button {...buttonProps}>
        {t(`labels:${label}`)}
      </Button>
    </Box>
  );
};

Next.propTypes = {
  /**
   * Determines what kind of button this is
   */
  submit: PropTypes.bool,

  /**
   * Removes top margin
   */
  disableGutters: PropTypes.bool,

  onClick: PropTypes.func,

  /**
   * Material UI size prop
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /**
   * Text to display inside of this button
   */
  label: PropTypes.string,

  /**
   * Disable click handler
   */
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),

  /**
   * Acts as a custom renderer and recieves all the button's props.
   */
  children: PropTypes.func,
};

Next.defaultProps = {
  submit: false,
  onClick: null,
  size: 'medium',
  disabled: false,
  children: null,
  label: 'submit',
  disableGutters: false,
};

export default Next;
