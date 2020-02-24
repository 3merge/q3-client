import { useAuth } from 'q3-ui-permissions';
import { orTruthy } from './utils';

export default (collectionName, isNew) => {
  const {
    canEdit,
    canCreate,
    canSeeSub,
    canCreateSub,
    canEditSub,
  } = useAuth(collectionName);

  return {
    isDisabled: () => {
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
      ),
  };
};
