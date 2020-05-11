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

  const hasNoOptions =
    !commentTab &&
    !historyTab &&
    !documentationTab &&
    !filesTab;

  return (
    <Box className={root} component="aside" elevation={0}>
      {!hasNoOptions && (
        <Tabs
          value={step}
          onChange={(e, num) => setStep(num)}
          indicatorColor="primary"
          textColor="primary"
          style={{ minHeight: 36, marginBottom: '1.5rem' }}
          centered
        >
          {!hasNoOptions && (
            <Tab label={t('meta')} className={item} />
          )}
          {commentTab && (
            <Tab
              label={t('internalComments')}
              className={item}
            />
          )}
          {filesTab && (
            <Tab label={t('files')} className={item} />
          )}
          {documentationTab && (
            <Tab
              label={t('documentation')}
              disabled={!documentationTab}
              className={item}
            />
          )}
          {historyTab && (
            <Tab label={t('history')} className={item} />
          )}
        </Tabs>
      )}

      {isStep(0, step, children)}
      {isStep(1, step, commentTab)}
      {isStep(2, step, filesTab)}
      {isStep(3, step, documentationTab)}
      {isStep(4, step, historyTab)}
    </Box>
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
