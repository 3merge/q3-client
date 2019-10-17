import React from 'react';
import { Redirect as RouterRedirect } from '@reach/router';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import minimatch from 'minimatch';

export default (ctx) => (coll) => {
  const permissions = get(
    React.useContext(ctx),
    'state.permissions',
    [],
  );

  const grants = permissions.filter(
    (v) => v.coll.localeCompare(coll) === 0,
  );

  const getOp = (name) =>
    grants && grants.length
      ? grants.find((grant) => grant.op === name)
      : null;

  const getField = (name, grant) =>
    grant
      ? String(grant.fields || '')
          .split(',')
          .map((i) => i.trim())
          .every((i) => minimatch(name, i))
      : false;

  const isDisabled = ({ op, name }) =>
    !getField(name, getOp(op)) && {
      disabled: true,
      readOnly: true,
    };

  const Hide = ({ children, op }) =>
    getOp(op) ? children : null;

  Hide.propTypes = {
    children: PropTypes.node.isRequired,
    op: PropTypes.string.isRequired,
  };

  const Redirect = ({ children, to, op }) =>
    getOp(op) ? children : <RouterRedirect to={to} />;

  Redirect.propTypes = {
    op: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
  };

  Redirect.defaultProps = {
    to: '/login',
  };

  const ProtectedRoute = ({
    component: Component,
    to,
    ...rest
  }) =>
    getOp('Read') ? (
      <Component {...rest} />
    ) : (
      <RouterRedirect to={to} />
    );

  ProtectedRoute.propTypes = {
    component: PropTypes.node.isRequired,
    to: PropTypes.string,
  };

  ProtectedRoute.defaultProps = {
    to: '/login',
  };

  return {
    canSee: getOp('Read'),
    canEdit: getOp('Update'),
    canDelete: getOp('Delete'),
    canCreate: getOp('Create'),
    isDisabled,
    Hide,
    Redirect,
    ProtectedRoute,
  };
};
