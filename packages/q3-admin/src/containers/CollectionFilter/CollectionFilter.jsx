import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useFilters } from 'q3-ui-rest';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Filters, Definitions } from '../state';

const CollectionFilter = ({ children, ...props }) => {
  const { collectionName, location } = React.useContext(
    Definitions,
  );

  let query;

  const warnAndReplaceValueWithDeprecatedProp = (
    deprecatedMap = {},
  ) => {
    Object.entries(deprecatedMap).forEach(
      ([key, value]) => {
        if (key in props) {
          // eslint-disable-next-line
          console.warn(
            `The "${key}" prop is deprecated. Please use "${value}" instead.`,
          );

          Object.assign(props, {
            [value]: get(props, key),
          });
        }
      },
    );

    return props;
  };

  const {
    includeSearchQuery,
    includeSearchQueryAs,
    fields,
  } = warnAndReplaceValueWithDeprecatedProp({
    runWithSearch: 'includeSearchQueryAs',
    lookup: 'fields',
  });

  if (includeSearchQuery)
    query = get(location, 'search', '');

  if (includeSearchQueryAs) query = includeSearchQueryAs;

  const value = useFilters({
    runOnInit: true,
    coll: collectionName,
    // previous versions called the prop lookup
    // this alias will be removed in future versions of q3
    fields,
    location,
    query,
  });

  return value.fetching ? (
    <CircularProgress />
  ) : (
    <Filters.Provider value={value}>
      {children}
    </Filters.Provider>
  );
};

CollectionFilter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]),

  includeSearchQuery: PropTypes.string,
  includeSearchQueryAs: PropTypes.string,
};

CollectionFilter.defaultProps = {
  children: null,
  includeSearchQuery: undefined,
  includeSearchQueryAs: undefined,
};

export default CollectionFilter;
