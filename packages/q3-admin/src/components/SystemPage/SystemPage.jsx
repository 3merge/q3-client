import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from '@reach/router';
import { Box, Link as MuiLink } from '@material-ui/core';
import { size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import useGlobalStyle from '../useStyle';

const SystemPage = ({ children, path }) => {
  const globalCls = useGlobalStyle();
  const { t } = useTranslation('labels');
  const p = useLocation();
  const isRoot = String(p.pathname)
    .substring(1)
    .replace(path, '')
    .trim();

  return (
    <Box
      bgcolor="background.paper"
      className={globalCls.fillViewportHeightWithoutAppbar}
      py={2}
    >
      {size(isRoot) ? (
        <MuiLink component={Link} to="..">
          {t('labels:back')}
        </MuiLink>
      ) : null}
      {children}
    </Box>
  );
};

SystemPage.defaultProps = {
  children: null,
};

SystemPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  path: PropTypes.string.isRequired,
};

export default SystemPage;
