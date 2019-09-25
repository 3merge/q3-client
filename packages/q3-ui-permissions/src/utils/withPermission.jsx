import React from 'react';
import PropTypes from 'prop-types';

export function extractAction(action = '') {
  return action.split(':');
}

export function compareActionLevels(pairState = [], pairComponent = []) {
  if (pairState[0] !== pairComponent[0]) return false;
  if (pairState[1] === 'any') return true;
  if (pairComponent[1] === 'any') return false;
  return pairState[1] === pairComponent[1];
}

export function compareAttributes(attributeState = '', attributeComponent = '') {
  if (attributeState.includes(`!${attributeComponent}`)) {
    return false;
  }
  if (attributeState.includes('*')) {
    return true;
  }
  return attributeState.includes(attributeComponent);
}

export function iteratePermissions(permissions = {}, opts = {}) {
  const { resource, action, attributes } = opts;
  const selected = permissions[resource];

  if (!selected) {
    return false;
  }

  return Object.entries(selected).some(([key, val]) => {
    const level = compareActionLevels(extractAction(key), extractAction(action));

    if (!level) return false;
    if (!attributes) return true;
    return compareAttributes(val.join(', '), attributes);
  });
}

export default (ctx) => (resource, permissionType = 'read:own') => {
  const { state } = React.useContext(ctx);
  const { permissions } = state;

  const Can = ({ component: Element, children, ...rest }) => {
    const { name } = rest;

    function checkPermissions(action) {
      return iteratePermissions(permissions, {
        attributes: name,
        action,
        resource,
      });
    }

    return (
      checkPermissions(permissionType) && (
        <Element {...rest} readOnly={!checkPermissions('update:own')}>
          {children}
        </Element>
      )
    );
  };

  Can.propTypes = {
    component: PropTypes.node.isRequired,
    children: PropTypes.node,
  };

  Can.defaultProps = {
    children: null,
  };

  return Can;
};

export const isVisible = (ctx) => (resource, action = 'read') => {
  const { state } = React.useContext(ctx);
  const { permissions } = state;
  return iteratePermissions(permissions, {
    action: `${action}:own`,
    resource,
  });
};
