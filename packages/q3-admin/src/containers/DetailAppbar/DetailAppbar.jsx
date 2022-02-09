import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  Hidden,
} from '@material-ui/core';
import Back from '../back';
import Breadcrumbs from '../../components/Breadcrumbs';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import DetailHeader from '../DetailHeader';
import DetailMeta from '../DetailMeta';
import ActionBar from '../../components/ActionBar';
import useStyle from './styles';

const DetailAppbar = ({
  children,
  actions,
  summary,
  ...rest
}) => {
  const cls = useStyle();

  return (
    <AppBar
      elevation={0}
      color="inherit"
      position="static"
      className={cls.root}
    >
      <Toolbar className={cls.toolbar}>
        <Box
          alignItems="center"
          display="flex"
          className={cls.nav}
        >
          <Back />
          <Hidden xsDown>
            <Breadcrumbs />
          </Hidden>
        </Box>
        <ActionBar>{actions}</ActionBar>
      </Toolbar>
      <Toolbar className={cls.header}>
        <Box
          alignItems="center"
          flexWrap="wrap"
          display="flex"
          flex="1"
        >
          <DetailFeaturedPhoto />
          <DetailHeader {...rest}>{summary}</DetailHeader>
        </Box>
        <Box className={cls.meta}>
          <Hidden mdDown>
            <DetailMeta />
          </Hidden>
        </Box>
      </Toolbar>
      {children}
    </AppBar>
  );
};

DetailAppbar.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  summary: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
};

DetailAppbar.defaultProps = {
  actions: null,
  children: null,
  summary: null,
};

export default React.memo(DetailAppbar);
