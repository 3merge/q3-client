import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { string } from 'q3-ui-helpers';
import useStyle from './useStyle';

const LineItemSubtotal = ({ subtotal }) => {
  const { t } = useTranslation('labels');
  const { root, icon } = useStyle();

  return (
    <Typography color="secondary" className={root}>
      <LoyaltyIcon className={icon} />
      {t('subtotalOf', { price: string.toPrice(subtotal) })}
    </Typography>
  );
};

LineItemSubtotal.propTypes = {
  subtotal: PropTypes.number.isRequired,
};

export default LineItemSubtotal;
