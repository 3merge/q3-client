import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './useStyle';

const isStep = (step, activeStep, content) =>
  step === activeStep && content ? content : null;

const SidebarTabs = ({
  children,
  commentTab,
  historyTab,
  documentationTab,
  filesTab,
}) => {
  const { t } = useTranslation('labels');
  const [step, setStep] = React.useState(0);
  const { root, item } = useStyles();

  return (
    <Paper className={root} component="aside" elevation={0}>
      <Box p={1}>
        <Tabs
          value={step}
          onChange={(e, num) => setStep(num)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={t('meta')} className={item} />
          <Tab
            label={t('internalComments')}
            disabled={!commentTab}
            className={item}
          />
          <Tab
            label={t('files')}
            disabled={!filesTab}
            className={item}
          />
          <Tab
            label={t('documentation')}
            disabled={!documentationTab}
            className={item}
          />
          <Tab
            label={t('history')}
            disabled={!historyTab}
            className={item}
          />
        </Tabs>
        <Box p={1}>
          {isStep(0, step, children)}
          {isStep(1, step, commentTab)}
          {isStep(2, step, filesTab)}
          {isStep(3, step, documentationTab)}
          {isStep(4, step, historyTab)}
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
  documentationTab: isChild,
};

SidebarTabs.defaultProps = {
  historyTab: null,
  commentTab: null,
  documentationTab: null,
};

export default SidebarTabs;
