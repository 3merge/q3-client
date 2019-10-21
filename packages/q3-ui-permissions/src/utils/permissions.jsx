import React from 'react';
import {
  Redirect as RouterRedirect,
  navigate,
} from '@reach/router';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import minimatch from 'minimatch';

const getGrants = (a, name) =>
  a.filter((v) => v.coll.localeCompare(name) === 0);

const getSingleGrant = (a, op) =>
  a && a.length ? a.find((grant) => grant.op === op) : null;

export const asProtectedRoute = (ctx) => {
  const ProtectedRoute = ({
    component: Component,
    coll,
    to,
    ...rest
  }) => {
    const permissions = get(
      React.useContext(ctx),
      'state.permissions',
      [],
    );

    if (
      !getSingleGrant(getGrants(permissions, coll), 'Read')
    ) {
      navigate(to);
      return null;
    }

    return <Component {...rest} />;
  };

  ProtectedRoute.propTypes = {
    component: PropTypes.node.isRequired,
    coll: PropTypes.string.isRequired,
    to: PropTypes.string,
  };

  ProtectedRoute.defaultProps = {
    to: '/login',
  };

  return ProtectedRoute;
};

export default (ctx) => (coll) => {
  const a = React.useContext(ctx);
  const permissions = get(a, 'state.permissions', []);
  const id = get(a, 'state.profile.id', []);

  const getOp = (name) =>
    getSingleGrant(getGrants(permissions, coll), name);

  const getField = (name, grant) =>
    grant
      ? String(grant.fields || '')
          .split(',')
          .map((i) => i.trim())
          .every((i) => minimatch(name, i))
      : false;

  const isDefined = (arg) =>
    arg !== undefined && arg !== null;

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

  return {
    canSee: isDefined(getOp('Read')),
    canEdit: isDefined(getOp('Update')),
    canDelete: isDefined(getOp('Delete')),
    canCreate: isDefined(getOp('Create')),
    matchID: (v) => id === v,
    Hide,
    Redirect,
  };
};
