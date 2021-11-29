/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import IconButton from 'q3-ui/lib/iconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  CartContext,
  CartLoadingContext,
} from '../context';
import { DRAWER_LINE_ITEM_REMOVE_CLASS } from '../constants';

const LineItemRemove = ({ id, disabled }) => {
  const { t } = useTranslation();
  const { remove } = React.useContext(CartContext);
  const loading = React.useContext(CartLoadingContext);

  return (
    <IconButton
      icon={DeleteOutlineIcon}
      label={t('labels:remove')}
      buttonProps={{
        onClick: () => remove(id),
        className: DRAWER_LINE_ITEM_REMOVE_CLASS,
        disabled: disabled || loading,
      }}
    />
  );
};

LineItemRemove.defaultProps = {
  disabled: false,
};

LineItemRemove.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default LineItemRemove;
