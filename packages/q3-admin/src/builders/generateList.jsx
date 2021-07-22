import React from 'react';
import { AddWrapper, Table } from '../containers';

export default (forwardedProps) => (props) => (
  <>
    <Table {...forwardedProps} {...props} />
    <AddWrapper {...forwardedProps} {...props} />
  </>
);
