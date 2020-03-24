import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { Add as AddSvg } from 'q3-ui-assets';
import useStyle from './useStyle';

const AddButton = ({ onClick }) => {
  const { t } = useTranslation();
  const isFunction = typeof onClick === 'function';

  const { root, titleCls } = useStyle();

  return isFunction ? (
    <Box
      className={root}
      role="button"
      tabIndex={-1}
      onClick={onClick}
      style={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <Box p={2} align="center">
        <Typography className={titleCls}>
          {t('titles:addToList')}
        </Typography>
        <Typography>
          {t('descriptions:addToList')}
        </Typography>
        <Add />
      </Box>
    </Box>
  ) : null;
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
