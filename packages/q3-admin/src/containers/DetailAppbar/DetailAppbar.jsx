import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  Hidden,
} from '@material-ui/core';
import { browser } from 'q3-ui-helpers';
import Back from '../back';
import Breadcrumbs from '../../components/Breadcrumbs';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import DetailHeader from '../DetailHeader';
import DetailMeta from '../DetailMeta';
import ActionBar from '../../components/ActionBar';
import useStyle from './styles';

const BackMobile = () => {
  const [anchor, setAnchor] = React.useState();

  React.useEffect(() => {
    if (browser.isBrowserReady())
      setAnchor(document.getElementById('menu-trigger'));
  }, []);

  return anchor
    ? ReactDOM.createPortal(
        <Box
          position="absolute"
          left="-.75rem"
          bgcolor="background.paper"
          top="-.25rem"
        >
          <Back />
        </Box>,
        anchor,
      )
    : null;
};

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
        <Hidden mdDown>
          <Box
            alignItems="center"
            display="flex"
            className={cls.nav}
          >
            <Back />
            <Breadcrumbs />
          </Box>
        </Hidden>
        <ActionBar>{actions}</ActionBar>
      </Toolbar>
      <Hidden lgUp>
        <Box className={cls.mobile}>
          <BackMobile />
          <DetailFeaturedPhoto />
          <DetailHeader {...rest}>{summary}</DetailHeader>
        </Box>
      </Hidden>
      <Hidden mdDown>
        <Toolbar className={cls.header}>
          <Box
            className={cls.titleContainer}
            flexWrap="nowrap"
            display="flex"
            flex="1"
          >
            <DetailFeaturedPhoto />
            <DetailHeader {...rest}>{summary}</DetailHeader>
          </Box>
          <Box className={cls.meta}>
            <DetailMeta />
          </Box>
        </Toolbar>
      </Hidden>
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
