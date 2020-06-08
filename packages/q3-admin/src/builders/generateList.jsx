import React from 'react';
import { Add, Table } from '../containers';

export default ({
  addComponent: AddForm,
  filterComponent: FilterForm,
  onNew,
  ...rest
}) => () => (
  <>
    <Table
      {...rest}
      addComponent={
        <Add onComplete={onNew}>
          <AddForm />
        </Add>
      }
      filterComponent={<FilterForm />}
    />
  </>
);
