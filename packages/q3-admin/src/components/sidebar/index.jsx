import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import AccountBox from '@material-ui/icons/AccountBox';
import DateRange from '@material-ui/icons/DateRange';
import { teal, blue } from '@material-ui/core/colors';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import SidebarTabs from './tabs';
import Column from './column';
import Panel from './panel';
import 'react-json-pretty/themes/acai.css';

const invoke = (fn, ...params) =>
  typeof fn === 'function' ? fn(...params) : [];

const getValue = (rawValue, formattedValue) => {
  if (!rawValue) return 'N/A';
  return formattedValue || rawValue;
};

const Sidebar = ({
  children,
  createdBy,
  lastUpdated,
  registerOptions,
  registerPanels,
  state,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Column>
      <SidebarTabs {...rest}>
        {invoke(
          registerPanels,
          { ...rest, ...state },
          t,
        ).map((panel, i) => (
          <Panel {...panel} key={i}>
            {panel.content}
          </Panel>
        ))}
        <Panel title="general">
          <List>
            {invoke(
              registerOptions,
              { ...rest, ...state },
              t,
            )
              .concat([
                {
                  color: teal[700],
                  icon: AccountBox,
                  title: t('labels:creator'),
                  description: getValue(createdBy),
                },
                {
                  color: blue[900],
                  icon: DateRange,
                  title: t('labels:lastUpdated'),
                  description: getValue(
                    lastUpdated,
                    moment(lastUpdated).format(
                      'MMMM Do YYYY, h:mm:ss a',
                    ),
                  ),
                },
              ])
              .map((option, i) => (
                <ListItem key={i} {...option}>
                  <ActionBar actions={option.actions}>
                    {option.action}
                  </ActionBar>
                </ListItem>
              ))}
          </List>
        </Panel>

        {children}
      </SidebarTabs>
    </Column>
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

  /**
   * Data to pass to each registration.
   */
  state: PropTypes.shape({}).isRequired,
};

Sidebar.defaultProps = {
  createdBy: null,
  lastUpdated: null,
  registerOptions: null,
  registerPanels: null,
};

export default Sidebar;
