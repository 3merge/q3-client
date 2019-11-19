import React from 'react';
import PropTypes from 'prop-types';
import { Location, navigate } from '@reach/router';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';

export const readFromState = (s, init = {}) => {
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

export const pushToState = (values) => {
  const query = new URLSearchParams();
  Object.entries(values).forEach(([key, v]) => {
    if (!v || (Array.isArray(v) && !v.length)) {
      query.delete(key);
    } else if (Array.isArray(v)) {
      query.set(`${key}[]`, v);
    } else {
      query.set(key, v);
    }
  });

  navigate(`?${query.toString()}`);
};

const props = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

export const DataLayer = ({ children, initialValues }) => (
  <Location>
    {(l) => (
      <Formik
        reinitialize
        onSubmit={pushToState}
        initialValues={readFromState(
          l.location.search,
          initialValues,
        )}
      >
        {(utils) => (
          <Form>
            {children(utils)}
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Form>
        )}
      </Formik>
    )}
  </Location>
);

DataLayer.propTypes = props;

export const QueryLayer = ({ children, initialValues }) => (
  <Location>
    {(l) =>
      children(
        readFromState(l.location.search, initialValues),
      )
    }
  </Location>
);

QueryLayer.propTypes = props;
