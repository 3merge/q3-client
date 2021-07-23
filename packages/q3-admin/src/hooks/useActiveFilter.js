import React from 'react';
import { get, isEqual } from 'lodash';
import { useNavigate } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from '../containers/state';

export default (search) => {
  const {
    collectionName,
    segments = {},
    rootPath,
  } = React.useContext(Definitions);

  const navigate = useNavigate();
  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'profile.filters', {});
  const items = get(filters, collectionName, {});

  const main = items.default;

  const updateFiltersInProfile = (newFilterObj, done) => {
    const master = { ...filters };
    master[collectionName] = newFilterObj;

    return update(
      {
        filters: master,
      },
      done,
    );
  };

  const pushInto = (name, value) => {
    const copy = { ...items };
    copy[name] = value;
    return copy;
  };

  const pullFrom = (name) => {
    const copy = { ...items };
    delete copy[name];
    return copy;
  };

  return {
    add: (name) =>
      updateFiltersInProfile(pushInto(name, search)),

    favourite: (name) => {
      return updateFiltersInProfile(
        pushInto('default', name),
      );
    },

    remove: (name) =>
      updateFiltersInProfile(pullFrom(name)),

    modify: (name, prevName) => (query) => {
      const goTo = () => {
        return navigate(`${rootPath}${query}`);
      };

      return name
        ? updateFiltersInProfile(
            Object.assign(
              pullFrom(prevName),
              {
                [name]: query,
              },
              isEqual(main, prevName)
                ? { default: name }
                : {},
            ),
            goTo,
          )
        : goTo();
    },

    filters: [
      {
        label: 'All',
        searchValue: '?active',
        value: '?active',
      },
      ...Object.entries(segments).map(([key, value]) => ({
        label: key,
        searchValue: value,
        value,
      })),
      ...Object.entries(items)
        .map(([key, value]) => ({
          label: key,
          fromProfile: true,
          searchValue: value,
          value,
        }))
        .filter(({ label }) => label !== 'default'),
    ],

    defaultQuery: {
      ...items,
      ...segments,
    }[main],

    main,
  };
};
