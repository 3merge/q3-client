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

const Comments = () => <p>SEE</p>;
const History = () => (
  <Box>
    <Typography>NAME on DATE</Typography>
    <JSONPretty
      mainStyle="background-color: #FFF"
      data={{ foo: 'bar' }}
    />
  </Box>
);

const Sidebar = ({ commentTab }) => {
  const [step, setStep] = React.useState(0);
  const { open, close, state } = useToggle();

  const renderTabs = () => (
    <Paper
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
            style={{ minWidth: 'auto' }}
          />
        </Tabs>

        {step === 0 && <Meta />}
        {step === 1 && commentTab ? commentTab : null}
        {step === 2 && <History />}
      </Box>
    </Paper>
  );

  return (
    <>
      <Hidden smDown>
        <Grid item lg={4} md={5}>
          {renderTabs(true)}
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <button onClick={open}>O</button>
        <Drawer open={state} onClose={close} anchor="top">
          <button onClick={close}>X</button>
          {renderTabs()}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
