import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { Panel } from 'q3-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './useStyle';

const isStep = (step, activeStep, content) =>
  step === activeStep && content ? content : null;

const SidebarTabs = ({
  children,
  commentTab,
  documentation,
  filesTab,
}) => {
  const { t } = useTranslation('labels');
  const [step, setStep] = React.useState(0);
  const { root, item, docs } = useStyles();

  const hasNoOptions =
    !commentTab && !documentation && !filesTab;

  return (
    <Box
      id="q3-tabber"
      className={root}
      component="aside"
      elevation={0}
    >
      {!hasNoOptions && (
        <Tabs
          id="q3-tabber"
          value={step}
          onChange={(e, num) => setStep(num)}
          indicatorColor="primary"
          textColor="primary"
          style={{ minHeight: 36, marginBottom: '1.5rem' }}
          centered
        >
          {!hasNoOptions && (
            <Tab
              id="q3-meta"
              label={t('meta')}
              className={item}
              value={0}
            />
          )}
          {commentTab && (
            <Tab
              id="q3-thread"
              label={t('internalComments')}
              className={item}
              value={1}
            />
          )}
          {filesTab && (
            <Tab
              id="q3-files"
              label={t('files')}
              className={item}
              value={2}
            />
          )}
          {documentation && (
            <Tab
              id="q3-docs"
              label={t('documentation')}
              disabled={!documentation}
              className={item}
              value={3}
            />
          )}
        </Tabs>
      )}
      {isStep(0, step, children)}
      {isStep(1, step, commentTab)}
      {isStep(2, step, filesTab)}
      {isStep(
        3,
        step,
        <Panel title={t('howTo')}>
          <Box className={docs}>{documentation}</Box>
        </Panel>,
      )}
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
