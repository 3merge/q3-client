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
import {
  getCreatedBy,
  filterByComparison,
  mapToTile,
  mapToPersistence,
} from './helpers';

const Detail = ({ filepath, children, notes }) => {
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

  return (
    <>
      {mapToPersistence(children)}
      <Section
        loading={state.fetching}
        renderSidebar={() => (
          <Sidebar
            commentTab={
              notes && authorization.canSeeSub('thread') ? (
                <Notes
                  id={id}
                  collectionName={collectionName}
                />
              ) : null
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
  filepath: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,
  notes: PropTypes.bool,
};

Detail.defaultProps = {
  notes: false,
};

export default Detail;
