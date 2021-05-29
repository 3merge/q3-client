import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import { isEqual } from 'lodash';

export const orTruthy = (v, next) => (v ? next : true);

export default (collectionName, isNew, options = {}) => {
  const {
    currentValues,
    initialValues,
    disabled,
  } = options;

  const {
    canEdit,
    canCreate,
    canSeeSub,
    canCreateSub,
    canEditSub,
    updateAuthRef,
    isDynamic,
  } = useAuth(collectionName, initialValues);

  React.useEffect(() => {
    updateAuthRef(currentValues);
  }, [!isEqual(currentValues, initialValues)]);

  return {
    isDisabled: () => {
      if (disabled) return true;
      if (!collectionName) return false;
      if (isNew) return !canCreate;
      return !canEdit;
    },

    checkReadAuthorizationContext: (name) =>
      orTruthy(collectionName, canSeeSub(name)),

    checkEditAuthorizationContext: (name) =>
      orTruthy(
        collectionName,
        isNew ? canCreateSub(name) : canEditSub(name),
      ) && !disabled,

    updateAuthRef,
    isDynamic,
  };
};
