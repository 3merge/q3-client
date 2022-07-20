import React from 'react';
import AlertWithDescription from '../AlertWithDescription';

const AlertFetchingError = () => (
  <AlertWithDescription
    text="fileManagerFetchingError"
    severity="error"
  />
);

export default AlertFetchingError;
