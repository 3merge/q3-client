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

const hidden = {
  disabled: true,
  readOnly: true,
  type: 'hidden',
  style: { display: 'none' },
};

const readOnly = {
  disabled: true,
  readOnly: true,
};

export default (ctx) => (coll, createdBy) => {
  const a = React.useContext(ctx);
  const permissions = get(a, 'state.permissions', []);
  const id = get(a, 'state.profile.id', '');

  const getOp = (name) => {
    const grant = getSingleGrant(
      getGrants(permissions, coll),
      name,
    );

    if (
      grant &&
      grant.ownership === 'Own' &&
      grant.op !== 'Create'
    ) {
      return id === createdBy ? grant : null;
    }

    return grant;
  };

  const getField = (name, grant) =>
    grant
      ? String(grant.fields || '')
          .split(',')
          .map((i) => i.trim())
          .every((i) => minimatch(name, i))
      : false;

  const isDefined = (arg) =>
    arg !== undefined && arg !== null;

  const isDisabledPrefix = (path) => ({ op, name }) => {
    if (!getField(`${path},${name}`, getOp('Read')))
      return hidden;

    if (!getField(`${path},${name}`, getOp(op)))
      return readOnly;

    return {};
  };

  const isDisabled = ({ op, name }) => {
    if (!getField(name, getOp('Read'))) return hidden;
    if (!getField(name, getOp(op))) return readOnly;

    return {};
  };

  const Hide = ({ children, op }) =>
    getOp(op) ? children : null;

  const HideByField = ({ path, children, op }) =>
    getField(path, getOp(op)) ? children : null;

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
    canEdit:
      isDefined(getOp('Read')) &&
      isDefined(getOp('Update')),
    canDelete: isDefined(getOp('Delete')),
    canCreate: isDefined(getOp('Create')),
    canCreateSub: (sub) => getField(sub, getOp('Create')),
    canEditSub: (sub) => getField(sub, getOp('Update')),
    canDeleteSub: (sub) => getField(sub, getOp('Delete')),
    canReadSub: (sub) => getField(sub, getOp('Read')),
    matchID: (v) => id === v,
    isDisabled,
    isDisabledPrefix,
    HideByField,
    Redirect,
    Hide,
  };
};
