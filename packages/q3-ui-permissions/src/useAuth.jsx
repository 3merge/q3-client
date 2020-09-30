import React from 'react';
import {
  Redirect as RouterRedirect,
  navigate,
} from '@reach/router';
import PropTypes from 'prop-types';
import Comparison from 'comparisons';
import {
  filterbyColl,
  findByOp,
  isDefined,
  hasField,
} from './utils/helpers';

const getPermissions = (c) =>
  c &&
  typeof c.state === 'object' &&
  Array.isArray(c.state.permissions)
    ? c.state.permissions
    : [];

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

export default (ctx) => (coll) => {
  const a = React.useContext(ctx);
  const permissions = getPermissions(a);

  const getOp = (name) =>
    findByOp(filterbyColl(permissions, coll), name);

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
    children: PropTypes.node.isRequired,
    op: PropTypes.string.isRequired,
    subfield: PropTypes.string,
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

  const read = getOp('Read');
  const del = getOp('Delete');
  const update = getOp('Update');
  const create = getOp('Create');

  return {
    canSee: isDefined(read),
    canDelete: isDefined(del),
    canCreate: isDefined(create),
    canEdit: isDefined(read) && isDefined(update),
    inClient: isDefined(read) && read.inClient,

    canEditConditionally(d) {
      const documentConditions = update?.documentConditions
        ? new Comparison(update.documentConditions).eval(d)
        : true;

      return this.canEdit && documentConditions;
    },

    canCreateSub: (sub) => hasField(create, sub),
    canEditSub: (sub) => hasField(update, sub),
    canDeleteSub: (sub) => hasField(del, sub),
    canSeeSub: (sub) => hasField(read, sub),

    HideByField,
    Redirect,
    Hide,
  };
};
