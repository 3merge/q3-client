import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Hidden,
  Typography,
  Paper,
} from '@material-ui/core';
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
  const searchComponent = !disableSearch ? (
    <Search />
  ) : null;

  return (
    <>
      <Hidden mdDown>
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
              {t(collectionName)}
            </Typography>
            {searchComponent}
          </Box>
        </Paper>
      </Hidden>
      <Hidden smUp>{searchComponent}</Hidden>
    </>
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
