import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AccountBox from '@material-ui/icons/AccountBox';
import HistoryIcon from '@material-ui/icons/History';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import { omit } from 'lodash';
import { getMeta } from 'q3-ui/lib/timeline';
import SidePanelContent from '../../components/SidePanelContent';
import { Dispatcher, Store } from '../state';
import { makeSidePanelContent } from './helpers';

const getAuthorship = getMeta('createdBy', 'createdAt');
const getLastModification = getMeta(
  'lastModifiedBy',
  'updatedAt',
);

const omitLegacyProps = (xs) => omit(xs, ['color']);

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

  const defaultOptions = makeSidePanelContent(
    registerOptions,
    ...params,
  );

  const panels = makeSidePanelContent(
    registerPanels,
    ...params,
  );

  if (createdBy)
    defaultOptions.push({
      title: t('labels:creator'),
      description: createdBy,
      icon: AccountBox,
    });

  if (updatedBy)
    defaultOptions.push({
      title: t('labels:lastUpdated'),
      description: updatedBy,
      icon: HistoryIcon,
    });

  return (
    <>
      {defaultOptions.length > 0 && (
        <SidePanelContent title="general">
          <List>
            {defaultOptions
              .map(omitLegacyProps)
              .map((option, i) => (
                <ListItem
                  key={i}
                  id={option.title}
                  {...option}
                >
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
