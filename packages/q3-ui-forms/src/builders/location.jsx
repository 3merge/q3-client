import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { Formik } from 'formik';

export const transformSearchParams = (s, init = {}) => {
  const params = new URLSearchParams(s);
  return Object.entries(init).reduce(
    (acc, [key, value]) =>
      Object.assign(acc, {
        [key]: Array.isArray(value)
          ? params.getAll(`${key}[]`)
          : params.get(key) || value,
      }),
    {},
  );
};

export const pushSearchParamsToHistory = (values) => {
  const query = new URLSearchParams();
  Object.entries(values).forEach(([key, v]) => {
    if (!v || (Array.isArray(v) && !v.length)) {
      query.delete(key);
    } else {
      query.set(key, v);
    }
  });

  const s = `?${query.toString()}`;
  window.history.pushState('', '', s);
};

const isNode = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.func,
]);

const DataLayer = ({ children, initialValues }) => (
  <Location>
    {(l) => (
      <Formik
        reinitialize
        initialValues={transformSearchParams(
          l.location.search,
          initialValues,
        )}
      >
        {children}
      </Formik>
    )}
  </Location>
);

DataLayer.propTypes = {
  children: isNode.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

const QueryLayer = ({ children, data }) => {
  const [store, setStore] = React.useState(data);
  const updateCache = React.useCallback(
    (v) => {
      if (v.length !== store.length) setStore(v);
    },
    [store],
  );

  return children({
    data,
    updateCache,
    store,
  });
};

QueryLayer.propTypes = {
  children: isNode.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const LocationAsStateForm = ({
  render,
  nodes,
  initialValues,
  searchForm: SearchForm,
}) => (
  <DataLayer initialValues={initialValues}>
    {(utils) => (
      <QueryLayer data={nodes}>
        {(data) => {
          pushSearchParamsToHistory(utils.values);
          return render(
            <SearchForm {...data} {...utils} />,
            data.store,
          );
        }}
      </QueryLayer>
    )}
  </DataLayer>
);

LocationAsStateForm.propTypes = {
  render: PropTypes.func.isRequired,
  searchForm: isNode.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

export default LocationAsStateForm;
