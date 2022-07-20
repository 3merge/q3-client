import React from 'react';
import AlertWithDescription from '../AlertWithDescription';

const AlertNoFiles = () => (
  <AlertWithDescription
    text="fileManagerEmptyDirectory"
    severity="warning"
  />
);

export default AlertNoFiles;
