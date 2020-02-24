import { pick } from 'lodash';
import { array } from 'q3-ui-helpers';

export const STATUS_READY = 'Ready';
export const STATUS_INITIALIZING = 'Initializing';

const orTruthy = (v, next) => (v ? next : true);

export const selectivelyKeepInitialValues = (
  values = {},
  pickDefinitions = [],
) =>
  array.hasLength(pickDefinitions)
    ? pick(values, pickDefinitions)
    : values;

export const getInitialStatus = (len, value) => {
  if (len) return value || STATUS_READY;
  return STATUS_INITIALIZING;
};

export const authenticationHelper = (
  /**
   * Without a collection name, no permissions required.
   */
  collectionName,
  /**
   * See q3-ui-permissions for inner-workings here.
   */
  {
    canEdit,
    canCreate,
    canSeeSub,
    canCreateSub,
    canEditSub,
  },
  /**
   * The assumption here is the "isNew" implies creation
   */
  isNew,
) => ({
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
});
