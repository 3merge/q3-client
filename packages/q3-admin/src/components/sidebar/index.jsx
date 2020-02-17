import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useToggle } from 'useful-state';
import JSONPretty from 'react-json-pretty';
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

export const SidebarTabs = ({
  children,
  commentTab,
  historyTab,
}) => {
  const [step, setStep] = React.useState(0);

  return (
    <Paper
      component="aside"
      elevation={0}
      style={{
        maxHeight: '75vh',
        overflow: 'auto',
      }}
    >
      <Box p={1}>
        <Tabs
          value={step}
          onChange={(e, num) => setStep(num)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          <Tab
            label="General"
            style={{ minWidth: 'auto' }}
          />
          <Tab
            label="Comments"
            disabled={!commentTab}
            style={{ minWidth: 'auto' }}
          />
          <Tab
            label="History"
            disabled={!historyTab}
            style={{ minWidth: 'auto' }}
          />
        </Tabs>

        {step === 0 && children}
        {step === 1 && commentTab ? commentTab : null}
        {step === 2 && historyTab ? historyTab : null}
      </Box>
    </Paper>
  );
};

const Sidebar = ({ documentationFilePath, ...rest }) => {
  const { open, close, state } = useToggle();

  return (
    <>
      <Hidden smDown>
        <Grid item lg={4} md={5}>
          <SidebarTabs {...rest}>BOOM</SidebarTabs>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <button onClick={open}>O</button>
        <Drawer open={state} onClose={close} anchor="top">
          <button onClick={close}>X</button>
          <SidebarTabs {...rest}>BOOM</SidebarTabs>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
