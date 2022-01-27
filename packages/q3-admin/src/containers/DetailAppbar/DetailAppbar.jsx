import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  Hidden,
  Button,
  Collapse,
} from '@material-ui/core';
import { useToggle } from 'useful-state';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { useTranslation } from 'q3-ui-locale';
import Back from '../back';
import Breadcrumbs from '../../components/Breadcrumbs';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import DetailHeader from '../DetailHeader';
import DetailActions from '../DetailActions';
import ActionBar from '../../components/ActionBar';
import useStyle from './styles';

const DetailAppbar = ({ children, summary, ...rest }) => {
  const cls = useStyle();
  const { toggle, state } = useToggle();
  const { t } = useTranslation('labels');

  return (
    <AppBar color="inherit" position="static">
      <Toolbar className={cls.toolbar}>
        <Box alignItems="center" display="flex">
          <Back />
        </Box>
        <ActionBar>
          <DetailActions {...rest} />
        </ActionBar>
      </Toolbar>
      <Toolbar className={cls.header}>
        <DetailFeaturedPhoto />
        <DetailHeader {...rest}>
          <Breadcrumbs />
        </DetailHeader>
        {summary && (
          <Hidden lgUp>
            <Button
              endIcon={<UnfoldMoreIcon />}
              onClick={toggle}
              className={cls.toggle}
            >
              {t('expandSummary')}
            </Button>
            <Collapse in={state}>{summary}</Collapse>
          </Hidden>
        )}
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
