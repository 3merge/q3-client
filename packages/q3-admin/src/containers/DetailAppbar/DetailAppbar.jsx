import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import Back from '../back';
import Breadcrumbs from '../../components/Breadcrumbs';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import DetailHeader from '../DetailHeader';
import DetailActions from '../DetailActions';
import ActionBar from '../../components/ActionBar';
import useStyle from './styles';

const DetailAppbar = ({ children, summary, ...rest }) => {
  const cls = useStyle();

  return (
    <AppBar color="inherit" position="static">
      <Toolbar className={cls.toolbar}>
        <Box alignItems="center" display="flex">
          <Back />
          <Breadcrumbs />
        </Box>
        <ActionBar>
          <DetailActions {...rest} />
        </ActionBar>
      </Toolbar>
      <Toolbar className={cls.header}>
        <DetailFeaturedPhoto />
        <DetailHeader {...rest}>{summary}</DetailHeader>
      </Toolbar>
      {children}
    </AppBar>
  );
};

DetailAppbar.propTypes = {
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
  children: null,
  summary: null,
};

export default DetailAppbar;
