import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Hidden,
  Typography,
  Paper,
} from '@material-ui/core';
import SearchDesktop from '../../components/SearchDesktop';
import SearchMobile from '../../components/SearchMobile';
import Title from '../../components/Title';
import DirectoryLink from '../../components/DirectoryLink';
import useStyles from './styles';
import ActionBarDesktop from '../../components/ActionBarDesktop';

const CollectionHeader = ({ disableSearch }) => {
  const cls = useStyles();

  // eslint-disable-next-line
  const SearchComponentRenderer = ({ children }) =>
    !disableSearch ? children : null;

  return (
    <>
      <SearchComponentRenderer>
        <Hidden lgUp>
          <SearchMobile />
        </Hidden>
      </SearchComponentRenderer>
      <Hidden mdDown>
        <Paper className={cls.root}>
          <Box
            display="flex"
            alignItems="center"
            px={2}
            style={{ height: '100%' }}
            py={0.5}
          >
            <DirectoryLink />
            <Typography
              color="inherit"
              component="h1"
              className={cls.title}
            >
              <Title />
            </Typography>
            <SearchComponentRenderer>
              <Box width="100%">
                <SearchDesktop />
              </Box>
            </SearchComponentRenderer>
            <ActionBarDesktop />
          </Box>
        </Paper>
      </Hidden>
    </>
  );
};

CollectionHeader.propTypes = {
  disableSearch: PropTypes.bool,
};

CollectionHeader.defaultProps = {
  disableSearch: false,
};

export default CollectionHeader;
