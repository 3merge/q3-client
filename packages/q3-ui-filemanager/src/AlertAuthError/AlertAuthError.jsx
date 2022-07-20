import React from 'react';
import AlertWithDescription from '../AlertWithDescription';

const AlertAuthError = () => (
  <AlertWithDescription
    text="fileManagerAuthorizationError"
    severity="error"
  />
);

export default AlertAuthError;
