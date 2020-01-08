import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { get } from 'lodash';
import { getForAutocomplete, useFilters } from 'q3-ui-rest';
import { withLocation } from 'with-location';
import { Form, Next } from 'q3-ui-forms/lib/builders';
import { asOptions } from 'q3-ui-forms/lib/helpers';
import SearchBar from 'q3-ui/lib/searchBar';
import Context from './state';
import { isArray } from './utils';
import SearchIcon from '../images/search';

export const Filter = withLocation(
  ({
    collectionName,
    children,
    params,
    pushTo,
    getFrom,
  }) => {
    const filters = useFilters({
      coll: collectionName,
      fields: isArray(children).map(
        (item) => item.props.name,
      ),
    });

    return !filters.fetching ? (
      <Form
        onSubmit={(values, actions) => {
          pushTo(values);
          actions.setSubmitting(false);
          navigate(`?${params.toString()}`);
        }}
        initialValues={isArray(children).reduce(
          (a, item) =>
            Object.assign(a, {
              [item.props.name]:
                getFrom(item.props.name) || '',
            }),
          {},
        )}
      >
        {isArray(children).map((child) =>
          React.cloneElement(child, {
            options: asOptions(
              get(
                filters,
                `fields.${child.props.name}`,
                [],
              ),
            ),
          }),
        )}
      </Form>
    ) : (
      'Please wait...'
    );
  },
);

const Search = ({ children, intercept }) => {
  const { collectionName, resourceName } = React.useContext(
    Context,
  );

  return (
    <SearchBar
      expanded
      icon={SearchIcon}
      filter={() => (
        <Filter collectionName={collectionName}>
          {children}
        </Filter>
      )}
      getResults={(e) =>
        getForAutocomplete(
          `/${collectionName}?search=${e}&limit=25`,
          resourceName,
        ).then((r) => {
          return intercept ? intercept(r) : r;
        })
      }
    />
  );
};

Search.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  intercept: PropTypes.func.isRequired,
};

Search.defaultProps = {
  children: [],
};

export default Search;
