/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import { Quantity } from 'q3-components';
import {
  CartContext,
  CartLoadingContext,
} from '../context';
import { DRAWER_LINE_ITEM_UPDATE_CLASS } from '../constants';

export const getValueFromParam = (e) =>
  get(e, 'target.value', e);

function focusNextElement() {
  try {
    const focussableElements =
      'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

    if (document.activeElement) {
      const el = document.activeElement
        .closest('td')
        .nextElementSibling.querySelector(
          focussableElements,
        );

      el.focus();
    }
  } catch (e) {
    // noop
  }
}

export const LineItemToggle = ({
  id,
  product,
  quantity,
  disabled,
  disableRemove,
  helperText,
}) => {
  const loading = React.useContext(CartLoadingContext);
  const { update, remove } = React.useContext(CartContext);

  const sendUpdateRequest = React.useCallback(
    (e) => {
      const newQuantity = getValueFromParam(e);
      if (Number(newQuantity) === Number(quantity)) return;

      const el = e.target;
      // eslint-disable-next-line consistent-return
      return newQuantity
        ? update({
            id,
            product,
            quantity: newQuantity,
          }).then(() => {
            if (el) {
              el.focus();
              focusNextElement();
            }
          })
        : remove(id);
    },
    [product, quantity],
  );

  return (
    <Box mt={1} className={DRAWER_LINE_ITEM_UPDATE_CLASS}>
      <Quantity
        size="small"
        defaultValue={quantity}
        disabled={loading || disabled}
        minimum={disableRemove ? 1 : 0}
        onBlur={sendUpdateRequest}
        onMinimum={remove}
        onQuantityChange={sendUpdateRequest}
        variant="spread"
        helperText={helperText}
      />
    </Box>
  );
};

LineItemToggle.propTypes = {
  disableRemove: PropTypes.bool,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
};

LineItemToggle.defaultProps = {
  disabled: false,
  helperText: undefined,
  disableRemove: false,
};

export default LineItemToggle;
