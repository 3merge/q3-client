import React from 'react';
import { get } from 'lodash';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from '../state';
import withSearch from '../withSearch';
import FiltersAdd from './FiltersClear';
import FiltersCustomAction from './FiltersCustomAction';

import FiltersDrawer from './FiltersDrawer';

const Groups = ({
  children,
  getActive,
  customFiltersApplied,
  ...etc
}) => {
  const { collectionName } = React.useContext(Definitions);
  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'filters', {});
  const items = get(filters, collectionName, {});
  const activeFitler = getActive(items);

  const patchProfile = (newFilterObj, done) => {
    const master = { ...filters };
    master[collectionName] = newFilterObj;

    return update(
      {
        filters: master,
      },
      done,
    );
  };

  const onModify = (name, query) => {
    const copy = { ...items };
    copy[name] = query;
    return patchProfile(copy, () => navigate(query));
  };

  const onDelete = (name) => {
    const copy = { ...items };
    delete copy[name];
    return patchProfile(copy);
  };

  return (
    <Box
      disableGutter
      maxWidth="xl"
      id="q3-custom-filter-groups"
    >
      <FiltersDrawer
        handleSave={onModify}
        formFields={children}
        {...etc}
      >
        {(onClick) => (
          <FiltersAdd
            onClick={onClick}
            hasActiveFilter={Boolean(activeFitler)}
            numberOfFiltersApplied={customFiltersApplied}
          />
        )}
      </FiltersDrawer>
      {Object.entries(items).map(([label, query]) => (
        <FiltersDrawer
          name={label}
          query={query}
          handleSave={onModify}
          formFields={children}
          {...etc}
        >
          {(onClick) => (
            <FiltersCustomAction
              onClick={onClick}
              onDelete={onDelete}
              isActive={activeFitler === label}
              name={label}
              query={query}
            />
          )}
        </FiltersDrawer>
      ))}
    </Box>
  );
};

Groups.propTypes = {
  children: PropTypes.node.isRequired,
  customFiltersApplied: PropTypes.number.isRequired,
  getActive: PropTypes.func.isRequired,
};

export default withSearch(Groups);
