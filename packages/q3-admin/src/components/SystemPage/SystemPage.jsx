import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from '@reach/router';
import {
  AppBar,
  Tab,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import { map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';
import useGlobalStyle from '../useStyle';

const SystemPage = ({ title, tabs, children }) => {
  const { pathname } = useLocation();
  const { t } = useTranslation('labels');
  const globalCls = useGlobalStyle();
  const cls = useStyle();

  return (
    <Box className={globalCls.fillViewportHeight}>
      <AppBar
        elevation={0}
        color="inherit"
        position="static"
      >
        <Toolbar className={cls.toolbar}>
          <Typography component="h1" variant="h5">
            {t(`titles:${title}`)}
          </Typography>
        </Toolbar>
        <Tabs value={pathname}>
          {map(tabs, (tab) => (
            <Tab
              component={Link}
              key={tab.label}
              label={t(tab.label)}
              style={{
                minWidth: 'auto',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
              }}
              to={tab.to}
              value={tab.to}
            />
          ))}
        </Tabs>
      </AppBar>
      <Box className={cls.view}>{children}</Box>
    </Box>
  );
};

SystemPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

export default SystemPage;
