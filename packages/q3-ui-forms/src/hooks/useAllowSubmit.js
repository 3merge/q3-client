import React from 'react';
import { object } from 'q3-ui-helpers';
import {
  AuthorizationState,
  BuilderState,
} from '../FormsContext';

export default (disabled) => {
  const { disable } = React.useContext(AuthorizationState);
  const { errors, isSubmitting } = React.useContext(
    BuilderState,
  );

  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    setIsDisabled(
      Boolean(
        disabled ||
          isSubmitting ||
          disable ||
          object.hasKeys(errors),
      ),
    );
  }, [disable, errors, isDisabled, isSubmitting]);

  // invert since this is checking for "allowed" state
  return !isDisabled;
};
