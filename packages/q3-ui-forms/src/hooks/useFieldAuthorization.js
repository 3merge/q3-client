import React from 'react';
import { get, isFunction } from 'lodash';
import {
  AuthorizationState,
  BuilderState,
  DispatcherState,
} from '../FormsContext';

const useFieldAuthorization = ({
  name,
  under,
  disabled,
}) => {
  const { canSee, canEdit, isDynamic } = React.useContext(
    AuthorizationState,
  );

  const { initialValues, values } = React.useContext(
    BuilderState,
  );
  const { setFieldValue } = React.useContext(
    DispatcherState,
  );

  const path = under ? `${under}.${name}` : name;
  const shouldUpdateAfterChange = isDynamic(path);

  const authState = {
    readOnly: !canEdit(path) || Boolean(disabled),
    visible: canSee(path),
  };

  React.useEffect(() => {
    if (
      shouldUpdateAfterChange &&
      authState.readOnly &&
      get(initialValues, name) !== get(values, name)
    )
      setFieldValue(name, get(initialValues, name));
  }, [authState.readOnly, initialValues, values]);

  // need to rollback value when permission changes back??
  // or do we?
  return authState;
};

export default useFieldAuthorization;
