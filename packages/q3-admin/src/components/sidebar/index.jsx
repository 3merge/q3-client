import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SidebarTabs from './tabs';
import 'react-json-pretty/themes/acai.css';

const MetaBox = ({ children, title }) => (
  <Box py={1}>
    <Typography
      variant="overline"
      display="block"
      gutterBottom
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const Meta = ({ lastUpdatedOn, createdBy }) => (
  <Box>
    <Grid container>
      <Grid item>
        <AccountBoxIcon />
      </Grid>
      <Grid item>Created By</Grid>
    </Grid>
    <Grid container>
      <Grid item>
        <AccountBoxIcon />
      </Grid>
      <Grid item>Last updated on</Grid>
    </Grid>

    <MetaBox title="Documentation">WOW</MetaBox>
    <MetaBox title="Reports">WOW</MetaBox>
  </Box>
);

const Sidebar = ({ documentationFilePath, ...rest }) => (
  <Grid item lg={4} md={5} xs={12}>
    <SidebarTabs {...rest}>BOOM</SidebarTabs>
  </Grid>
);

export default Sidebar;
