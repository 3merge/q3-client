import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import AccountBox from '@material-ui/icons/AccountBox';
import DateRange from '@material-ui/icons/DateRange';

import Option from './option';
import SidebarTabs from './tabs';
import 'react-json-pretty/themes/acai.css';

const Sidebar = ({
  children,
  createdBy,
  lastUpdated,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Grid item lg={4} md={12} xs={12}>
      <SidebarTabs {...rest}>
        <Option
          title={t('labels:creator')}
          description={createdBy || 'N/A'}
          icon={AccountBox}
        />
        <Option
          icon={DateRange}
          title={t('labels:lastUpdated')}
          description={
            lastUpdated
              ? moment(lastUpdated).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )
              : 'N/A'
          }
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
  createdBy: null,
  lastUpdated: null,
};

export default Sidebar;
