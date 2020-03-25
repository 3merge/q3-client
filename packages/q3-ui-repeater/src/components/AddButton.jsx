import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import useStyle from './useStyle';

const AddButton = ({ onClick, colSpan }) => {
  const { t } = useTranslation();
  const isFunction = typeof onClick === 'function';
  const { titleCls } = useStyle();

  return isFunction ? (
    <Grid
      container
      role="button"
      tabIndex={-1}
      onClick={onClick}
      spacing={1}
      style={{
        cursor: 'pointer',
        padding: '1rem',
      }}
    >
      <Grid item>
        <Add />
      </Grid>
      <Grid item>
        <Typography className={titleCls}>
          {t('titles:addToList')}
        </Typography>
        <Typography>
          {t('descriptions:addToList')}
        </Typography>
      </Grid>
    </Grid>
  ) : null;
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
