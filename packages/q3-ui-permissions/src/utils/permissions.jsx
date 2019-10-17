import React from 'react';
import { Redirect as RouterRedirect } from '@reach/router';
import PropTypes from 'prop-types';
import minimatch from 'minimatch';

export default (ctx) => (coll) => {
  const { state } = React.useContext(ctx);
  const { permissions = [] } = state;

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
          .some((i) => minimatch(name, i))
      : false;

  const Hide = ({ children, op }) => getOp(op) && children;

  Hide.propTypes = {
    children: PropTypes.node.isRequired,
    op: PropTypes.string.isRequired,
  };

  const Disable = ({
    component: Component,
    op,
    name,
    ...rest
  }) =>
    getField(name, getOp(op)) ? (
      <Component {...rest} />
    ) : (
      <Component {...rest} disabled readOnly />
    );

  Disable.propTypes = {
    component: PropTypes.func.isRequired,
    op: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  const Redirect = ({
    component: Component,
    op,
    ...rest
  }) =>
    getOp(op) ? (
      <Component {...rest} />
    ) : (
      <RouterRedirect to="/login" />
    );

  Redirect.propTypes = {
    op: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
  };

  return {
    canSee: getOp('Read'),
    canEdit: getOp('Update'),
    canDelete: getOp('Delete'),
    canCreate: getOp('Create'),

    Hide,
    Disable,
    Redirect,
  };
};
