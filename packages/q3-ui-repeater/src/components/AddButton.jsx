import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const AddButton = ({ onClick }) => {
  const { t } = useTranslation('labels');
  const isFunction = typeof onClick === 'function';

  return isFunction ? (
    <Box mt={1}>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClick}
        size="large"
      >
        {t('addToList')}
      </Button>
    </Box>
  ) : null;
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
