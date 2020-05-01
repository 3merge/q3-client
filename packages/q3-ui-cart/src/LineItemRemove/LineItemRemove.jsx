/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { CartContext } from '../context';
import { DRAWER_LINE_ITEM_REMOVE_CLASS } from '../constants';

const LineItemRemove = ({ id }) => {
  const { t } = useTranslation();
  const { remove } = React.useContext(CartContext);

  return (
    <Box>
      <Button
        size="small"
        onClick={() => remove(id)}
        className={DRAWER_LINE_ITEM_REMOVE_CLASS}
        style={{
          textDecoration: 'underline',
          justifyContent: 'flex-start',
        }}
      >
        {t('labels:remove')}
      </Button>
    </Box>
  );
};

LineItemRemove.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LineItemRemove;
