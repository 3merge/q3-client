import React from 'react';
import { get, isEqual, size } from 'lodash';
import {
  AuthorizationState,
  BuilderState,
  DispatcherState,
} from '../FormsContext';

const isEmpty = (v) =>
  v === null ||
  v === undefined ||
  v === '' ||
  (Array.isArray(v) && !size(v));

const useFieldAuthorization = ({
  name,
  under,
  disabled,
}) => {
  const ref = React.useRef({
    current: true,
  });

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
      ref.current &&
      shouldUpdateAfterChange &&
      authState.readOnly &&
      !isEqual(prev, curr) &&
      !(isEmpty(prev) && isEmpty(curr))
    )
      setFieldValue(name, prev);

    return () => {
      ref.current = false;
    };
  }, [authState.readOnly, prev, curr]);

  return authState;
};

export default useFieldAuthorization;
