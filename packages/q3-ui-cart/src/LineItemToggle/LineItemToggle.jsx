/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import { Quantity } from 'q3-components';
import { CartContext } from '../context';
import { DRAWER_LINE_ITEM_UPDATE_CLASS } from '../constants';

export const getValueFromParam = (e) =>
  get(e, 'target.value', e);

export const LineItemToggle = ({
  id,
  product,
  quantity,
}) => {
  const { update, remove, loading } = React.useContext(
    CartContext,
  );

  const sendUpdateRequest = React.useCallback(
    (e) => {
      const newQuantity = getValueFromParam(e);
      return newQuantity
        ? update({ id, product, quantity: newQuantity })
        : remove(id);
    },
    [product, quantity],
  );

  return (
    <Box className={DRAWER_LINE_ITEM_UPDATE_CLASS}>
      <Quantity
        size="small"
        defaultValue={quantity}
        disabled={loading}
        minimum={0}
        onBlur={sendUpdateRequest}
        onMinimum={remove}
        onQuantityChange={sendUpdateRequest}
        variant="spread"
      />
    </Box>
  );
};

LineItemToggle.propTypes = {
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
};

export default LineItemToggle;
