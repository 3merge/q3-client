/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from 'q3-ui/lib/iconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  CartContext,
  CartLoadingContext,
} from '../context';
import { DRAWER_LINE_ITEM_REMOVE_CLASS } from '../constants';

const LineItemRemove = ({ id }) => {
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
        disabled: loading,
      }}
    />
  );
};

LineItemRemove.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LineItemRemove;
