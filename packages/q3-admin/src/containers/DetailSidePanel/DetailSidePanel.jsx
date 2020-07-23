import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Tooltip from 'q3-ui/lib/tooltip';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ForumIcon from '@material-ui/icons/Forum';
import PanoramaIcon from '@material-ui/icons/Panorama';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import useStyle from './useStyle';
import { useAppContext } from '../../hooks';
import SidePanel from '../../components/SidePanel';

export const hasValue = ([, value]) => value;

export const hasOneTruthyValue = (o = {}) =>
  Object.values(o).some((item) => Boolean(item));

export const hasMoreThanOneTruthyValue = (o = {}) =>
  Object.values(o).reduce((acc, next) => {
    // eslint-disable-next-line
    if (next) acc += 1;
    return acc;
  }, 0) > 1;

export const isStep = (step, activeStep, content) =>
  step === activeStep && content ? content : null;

const DetailSidePanel = ({ children, ...props }) => {
  const [step, setStep] = React.useState(0);
  const { root, item } = useStyle();
  const { t } = useTranslation('labels');

  const { can } = useAppContext({
    // used to hide the sidebar overall
    aside: true,
    ...props,
  });

  const icons = {
    'q3-meta': <FingerprintIcon />,
    'q3-picture': <PanoramaIcon />,
    'q3-thread': <ForumIcon />,
    'q3-files': <AttachFileIcon />,
    'q3-docs': <ContactSupportIcon />,
  };

  const tabs = {
    'q3-picture': can('picture'),
    'q3-thread': can('notes'),
    'q3-files': can('files'),
    'q3-docs': can('documentation'),
  };

  const outputTabs = {
    'q3-meta': hasOneTruthyValue(tabs),
    ...tabs,
  };

  const handleChange = React.useCallback((e, tabIndex) => {
    setStep(tabIndex);
  }, []);

  const renderTabs = React.useCallback(
    () =>
      Object.entries(outputTabs)
        .filter(hasValue)
        .map(([key], i) => (
          <Tooltip title={t(key)} key={i}>
            <BottomNavigationAction
              icon={icons[key]}
              label={t(key)}
              className={classnames(['q3-tabs-item', item])}
              value={i}
              id={key}
            />
          </Tooltip>
        )),
    [outputTabs, icons],
  );

  const renderSteps = React.useCallback(
    () =>
      [children]
        .concat(Object.values(tabs))
        .filter(Boolean)[step] || null,
    [tabs, step],
  );

  return can('aside') ? (
    <SidePanel id="q3-tabber">
      {outputTabs['q3-meta'] && (
        <Paper elevation={0} className={root}>
          <BottomNavigation
            value={step}
            onChange={handleChange}
          >
            {renderTabs()}
          </BottomNavigation>
        </Paper>
      )}
      {renderSteps()}
    </SidePanel>
  ) : null;
};

DetailSidePanel.propTypes = {
  children: PropTypes.node,
  documentation: PropTypes.node,
  files: PropTypes.node,
  notes: PropTypes.node,
};

DetailSidePanel.defaultProps = {
  children: null,
  documentation: null,
  files: null,
  notes: null,
};

export default DetailSidePanel;
