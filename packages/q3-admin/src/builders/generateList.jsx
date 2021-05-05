import React from 'react';
import { Table } from '../containers';

export default (forwardedProps) => (props) => (
  <Table {...forwardedProps} {...props} />
);
