import React from 'react';
import { get, isEqual } from 'lodash';
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

  const prev = get(initialValues, name);
  const curr = get(values, name);

  React.useEffect(() => {
    if (
      shouldUpdateAfterChange &&
      authState.readOnly &&
      !isEqual(prev, curr)
    )
      setFieldValue(name, prev);
  }, [authState.readOnly, prev, curr]);

  return authState;
};

export default useFieldAuthorization;
