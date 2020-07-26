import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AccountBox from '@material-ui/icons/AccountBox';
import { teal, orange } from '@material-ui/core/colors';
import HistoryIcon from '@material-ui/icons/History';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import { getMeta } from 'q3-ui/lib/timeline';
import SidePanelContent from '../../components/SidePanelContent';
import { Dispatcher, Store } from '../state';

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

const DetailSidePanelContent = ({
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
          gutters
        >
          {panel.content}
        </SidePanelContent>
      ))}
    </>
  );
};

DetailSidePanelContent.propTypes = {
  /**
   * Programatically add options to the list.
   */
  registerOptions: PropTypes.func,

  /**
   * Programatically add panels to the list.
   */
  registerPanels: PropTypes.func,
};

DetailSidePanelContent.defaultProps = {
  registerOptions: null,
  registerPanels: null,
};

export default DetailSidePanelContent;
