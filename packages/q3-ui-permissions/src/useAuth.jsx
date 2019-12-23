import React from 'react';
import {
  Redirect as RouterRedirect,
  navigate,
} from '@reach/router';
import PropTypes from 'prop-types';
import {
  filterbyColl,
  findByOp,
  isDefined,
  satisfiesOwnership,
  hasField,
} from './utils/helpers';

const getPermissions = (c) =>
  c &&
  typeof c.state === 'object' &&
  Array.isArray(c.state.permissions)
    ? c.state.permissions
    : [];

const getProfile = (c) =>
  c &&
  typeof c.state === 'object' &&
  typeof c.state.profile === 'object'
    ? c.state.profile.id
    : '';

export const asProtectedRoute = (ctx) => {
  const ProtectedRoute = ({
    component: Component,
    coll,
    to,
    ...rest
  }) => {
    const permissions = getPermissions(
      React.useContext(ctx),
    );

    if (
      !findByOp(filterbyColl(permissions, coll), 'Read')
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

export default (ctx) => (coll, createdBy) => {
  const a = React.useContext(ctx);
  const permissions = getPermissions(a);
  const id = getProfile(a);

  const getOp = (name) => {
    const grant = findByOp(
      filterbyColl(permissions, coll),
      name,
    );

    return satisfiesOwnership(grant, id, createdBy)
      ? grant
      : null;
  };

  const Hide = ({ children, op }) =>
    getOp(op) ? children : null;

  Hide.propTypes = {
    children: PropTypes.node.isRequired,
    op: PropTypes.string.isRequired,
  };

  const HideByField = ({ path, subfield, children, op }) =>
    hasField(
      getOp(op),
      subfield ? `${subfield}.${path}` : path,
    )
      ? children
      : null;

  HideByField.propTypes = {
    path: PropTypes.string.isRequired,
    subfield: PropTypes.string.isRequired,
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
    canDelete: isDefined(getOp('Delete')),
    canCreate: isDefined(getOp('Create')),
    canEdit:
      isDefined(getOp('Read')) &&
      isDefined(getOp('Update')),

    canCreateSub: (sub) => hasField(getOp('Create'), sub),
    canEditSub: (sub) => hasField(getOp('Update'), sub),
    canDeleteSub: (sub) => hasField(getOp('Delete'), sub),
    canReadSub: (sub) => hasField(getOp('Read'), sub),

    HideByField,
    Redirect,
    Hide,
  };
};
