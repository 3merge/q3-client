import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Search from '../../components/Search';
import Back from '../back';
import useStyles from './styles';

const CollectionHeader = ({
  collectionName,
  disableSearch,
  id,
}) => {
  const cls = useStyles();
  const { t } = useTranslation('labels');

  return (
    <Paper className={cls.root}>
      <Box
        display="flex"
        alignItems="center"
        px={2}
        style={{ height: '100%' }}
        py={0.5}
      >
        <Typography
          color="inherit"
          component="h1"
          className={cls.title}
        >
          {id && <Back />}
          {t(collectionName)}
        </Typography>
        {!disableSearch && <Search />}
        <Box
          whiteSpace="nowrap"
          display="flex"
          id="q3-collection-actions"
        >
          <Box
            whiteSpace="nowrap"
            display="flex"
            id="q3-collection-actions-top"
          />
        </Box>
      </Box>
    </Paper>
  );
};

CollectionHeader.propTypes = {
  collectionName: PropTypes.string.isRequired,
  disableSearch: PropTypes.bool,
  id: PropTypes.string,
};

CollectionHeader.defaultProps = {
  disableSearch: false,
  id: undefined,
};

export default CollectionHeader;
