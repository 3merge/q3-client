import React from 'react';
import { get } from 'lodash';
import { useAuth } from 'q3-ui-permissions';

const withAuthorization = (
  Component,
  {
    subfield,
    name,
    collectionName,
    createdBy,
    bypassAuthorization,
    isNew,
    ...rest
  },
) => {
  if (bypassAuthorization)
    return React.cloneElement(Component, { name, ...rest });

  const { isDisabled, isDisabledPrefix } = useAuth(
    collectionName,
    get(createdBy, 'id'),
  );

  const authFn = subfield
    ? isDisabledPrefix(subfield)
    : isDisabled;

  return null;
};

export default withAuthorization;
