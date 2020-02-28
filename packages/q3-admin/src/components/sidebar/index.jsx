import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import AccountBox from '@material-ui/icons/AccountBox';
import DateRange from '@material-ui/icons/DateRange';
import { makeStyles } from '@material-ui/core/styles';
import Option from './option';
import SidebarTabs from './tabs';
import 'react-json-pretty/themes/acai.css';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: 0,
    [theme.breakpoints.down('md')]: {
      marginTop: '4.2rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '-1rem',
    },
  },
}));

const Sidebar = ({
  children,
  createdBy,
  lastUpdated,
  ...rest
}) => {
  const { t } = useTranslation();
  const { root } = useStyle();

  return (
    <Grid item md={4} sm={12} xs={12} className={root}>
      <SidebarTabs {...rest}>
        <Option
          title={t('labels:creator')}
          description={createdBy}
          icon={AccountBox}
        />
        <Option
          icon={DateRange}
          title={t('labels:lastUpdated')}
          description={moment(lastUpdated).format(
            'MMMM Do YYYY, h:mm:ss a',
          )}
        />
        {children}
      </SidebarTabs>
    </Grid>
  );
};

Sidebar.propTypes = {
  /**
   * Displays in the first tab, underneath the standard meta information.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,

  /**
   * Ideally, a first and last name of the user who created the resource.
   */
  createdBy: PropTypes.string,

  /**
   * Date object representating last update date.
   */
  lastUpdated: PropTypes.string,
};

Sidebar.defaultProps = {
  createdBy: 'N/A',
  lastUpdated: new Date(),
};

export default Sidebar;
