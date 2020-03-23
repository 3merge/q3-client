import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './useStyle';

const SidebarTabs = ({
  children,
  commentTab,
  historyTab,
}) => {
  const { t } = useTranslation('labels');
  const [step, setStep] = React.useState(0);
  const { root, item } = useStyles();

  return (
    <Paper className={root} component="aside" elevation={0}>
      <Box p={1} px={3}>
        <Tabs
          value={step}
          onChange={(e, num) => setStep(num)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          <Tab label={t('meta')} className={item} />
          <Tab
            label={t('internalComments')}
            disabled={!commentTab}
            className={item}
          />
          <Tab
            label={t('history')}
            disabled={!historyTab}
            className={item}
          />
        </Tabs>
        <Box my={2}>
          {step === 0 && children}
          {step === 1 && commentTab ? commentTab : null}
          {step === 2 && historyTab ? historyTab : null}
        </Box>
      </Box>
    </Paper>
  );
};

const isChild = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.object,
]);

SidebarTabs.propTypes = {
  children: isChild.isRequired,
  commentTab: isChild,
  historyTab: isChild,
};

SidebarTabs.defaultProps = {
  historyTab: null,
  commentTab: null,
};

export default SidebarTabs;
