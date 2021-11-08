import React from 'react';
import {
  Redirect as RouterRedirect,
  navigate,
} from '@reach/router';
import PropTypes from 'prop-types';
import { uniq, isString } from 'lodash';
import Comparison from 'comparisons';
import {
  filterbyColl,
  findByOp,
  isDefined,
  isDynamicField,
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
    component: PropTypes.elementType.isRequired,
    coll: PropTypes.string.isRequired,
    to: PropTypes.string,
  };

  ProtectedRoute.defaultProps = {
    to: '/login',
  };

  return ProtectedRoute;
};

export default (ctx) => (coll, doc = {}) => {
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
      doc,
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

  const canSub = (op) => (sub) =>
    isString(sub) ? hasField(op, sub, doc) : true;

  return {
    ...a,
    canSee: isDefined(read),
    canDelete: isDefined(del),
    canCreate: isDefined(create),
    canEdit: isDefined(read) && isDefined(update),
    inClient: isDefined(read) && read.inClient,

    isDynamic: (name) => {
      const tempGrant = {
        fields: uniq(
          [
            read?.fields,
            create?.fields,
            update?.fields,
          ].flat(),
        ),
      };

      return isDynamicField(tempGrant, name);
    },

    canEditConditionally(d) {
      const documentConditions = update?.documentConditions
        ? new Comparison(update.documentConditions).eval(d)
        : true;

      return this.canEdit && documentConditions;
    },

    canCreateSub: canSub(create),
    canEditSub: canSub(update),
    canDeleteSub: canSub(del),
    canSeeSub: canSub(read),

    HideByField,
    Redirect,
    Hide,
  };
};
