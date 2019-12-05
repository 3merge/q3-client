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
    return <Component name={name} {...rest} />;

  const { isDisabled, isDisabledPrefix } = useAuth(
    collectionName,
    get(createdBy, 'id'),
  );

  const authFn = subfield
    ? isDisabledPrefix(subfield)
    : isDisabled;

  return (
    <Component
      authFn={authFn}
      isNew={isNew}
      name={name}
      {...rest}
    />
  );
};

export default withAuthorization;
