import React from 'react';
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
    <Grid item lg={4} md={5} xs={12}>
      <SidebarTabs {...rest}>
        <Option
          title={t('titles:creator')}
          description={createdBy}
          icon={AccountBox}
        />
        <Option
          title={t('titles:lastUpdated')}
          description={lastUpdated}
          icon={DateRange}
        />
        {children}
      </SidebarTabs>
    </Grid>
  );
};

export default Sidebar;
