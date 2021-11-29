import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'q3-ui-locale';
import AccountBox from '@material-ui/icons/AccountBox';
import { teal, orange } from '@material-ui/core/colors';
import HistoryIcon from '@material-ui/icons/History';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import { getMeta } from 'q3-ui/lib/timeline';
import SidePanelContent from '../SidePanelContent';
import { Dispatcher, Store } from '../../containers/state';
import SidebarTabs from './tabs';
import Column from './column';

const invoke = (fn, data, dispatchers, t) =>
  typeof fn === 'function' &&
  typeof data === 'object' &&
  data !== null &&
  Object.keys(data).length
    ? fn(data, dispatchers, t)
    : [];

const getAuthorship = getMeta('createdBy', 'createdAt');
const getLastModification = getMeta(
  'lastModifiedBy',
  'updatedAt',
);

const Sidebar = ({
  children,
  registerOptions,
  registerPanels,
}) => {
  const { t } = useTranslation();
  const dispatchers = React.useContext(Dispatcher);
  const { data } = React.useContext(Store);
  const params = [data, dispatchers, t];

  const createdBy = getAuthorship(data);
  const updatedBy = getLastModification(data);

  const defaultOptions = invoke(registerOptions, ...params);
  const panels = invoke(registerPanels, ...params);

  if (createdBy)
    defaultOptions.push({
      color: teal[700],
      icon: AccountBox,
      title: t('labels:creator'),
      description: createdBy,
    });

  if (updatedBy)
    defaultOptions.push({
      color: orange[700],
      icon: HistoryIcon,
      title: t('labels:lastUpdated'),
      description: updatedBy,
    });

  return (
    <>
      {defaultOptions.length > 0 && (
        <SidePanelContent title="general">
          <List>
            {defaultOptions.map((option, i) => (
              <ListItem key={i} {...option}>
                <ActionBar actions={option.actions}>
                  {option.action}
                </ActionBar>
              </ListItem>
            ))}
          </List>
        </SidePanelContent>
      )}
      {panels.map((panel, i) => (
        <SidePanelContent
          {...panel}
          key={i}
          transitionDelay={i + 1 * 150}
        >
          {panel.content}
        </SidePanelContent>
      ))}
      {children}
    </>
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

  /**
   * Programatically add options to the list.
   */
  registerOptions: PropTypes.func,

  /**
   * Programatically add panels to the list.
   */
  registerPanels: PropTypes.func,
};

Sidebar.defaultProps = {
  createdBy: null,
  lastUpdated: null,
  registerOptions: null,
  registerPanels: null,
};

export default Sidebar;
