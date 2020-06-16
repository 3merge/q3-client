import React from 'react';
import {
  AuthorizationState,
  BuilderState,
  DispatcherState,
  ValidationState,
} from '../../FormsContext';

export default ({
  canEdit,
  canSee,
  chain,
  children,
  collectionName,
  disable,
  isNew,
  validationSchema,
  validateAt,
  setField,
  onReset,
  onChange,
  setValues,
  setErrors,
  isSubmitting,
  errors,
  values,
}) => (
  <AuthorizationState.Provider
    value={{
      canEdit,
      canSee,
      collectionName,
      disable,
      isNew,
    }}
  >
    <ValidationState.Provider
      value={{
        validationSchema,
        validateAt,
        setField,
        chain,
      }}
    >
      <DispatcherState.Provider
        value={{
          onReset,
          onChange,
          setValues,
          setErrors,
        }}
      >
        <BuilderState.Provider
          value={{
            isSubmitting,
            errors,
            values,
          }}
        >
          {children}
        </BuilderState.Provider>
      </DispatcherState.Provider>
    </ValidationState.Provider>
  </AuthorizationState.Provider>
);
