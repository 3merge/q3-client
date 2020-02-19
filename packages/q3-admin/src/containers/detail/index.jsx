import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import Tabs from 'q3-ui/lib/tabs';
import Context from '../state';
import Sidebar from '../../components/sidebar';
import Section from '../../components/section';
import Notes from '../notes';
import Documentation from '../documentation';
import History from '../history';
import Trash from '../../components/trash';
import {
  getCreatedBy,
  filterByComparison,
  mapToTile,
  mapToPersistence,
} from './helpers';
import { getAuthor } from '../notes';

const Detail = ({
  history,
  filepath,
  children,
  notes,
  trash,
}) => {
  const {
    resourceName,
    resourceNameSingular,
    collectionName,
    id,
    ...state
  } = React.useContext(Context);
  const data = get(state, resourceNameSingular);

  const authorization = useAuth(
    collectionName,
    getCreatedBy(data),
  );

  const tabs = mapToTile(
    filterByComparison(children, data),
    {
      resourceName,
      resourceNameSingular,
      collectionName,
      authorization,
      state,
      id,
    },
  );

  if (trash && authorization.canDelete)
    tabs.push({
      to: '/trash',
      label: 'trash',
      component: () => (
        <Trash
          url={`/${resourceName}`}
          onClick={state.remove()}
        />
      ),
    });

  return (
    <>
      {mapToPersistence(children)}
      <Section
        loading={state.fetching}
        renderSidebar={() => (
          <Sidebar
            createdBy={getAuthor(data)}
            lastUpdated={get(data, 'lastUpdated')}
            commentTab={
              notes && (
                <Notes
                  id={id}
                  collectionName={collectionName}
                />
              )
            }
            historyTab={
              history && (
                <History
                  id={id}
                  collectionName={collectionName}
                />
              )
            }
          >
            <Documentation filepath={filepath} />
          </Sidebar>
        )}
      >
        <Tabs
          root={`/${resourceName}/${id}`}
          views={tabs}
        />
      </Section>
    </>
  );
};

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,

  /**
   * Will auto-append docmentation to sidebar.
   */
  filepath: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,

  /**
   * Will auto-append comments to sidebar.
   */
  notes: PropTypes.bool,

  /**
   * Will auto-append trash tab.
   */
  trash: PropTypes.bool,

  /**
   * Will auto-append history tab.
   */
  history: PropTypes.bool,
};

Detail.defaultProps = {
  notes: false,
  trash: false,
  history: false,
};

export default Detail;
