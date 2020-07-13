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
        AddForm ? (
          <Add onComplete={onNew}>
            <AddForm />
          </Add>
        ) : null
      }
      filterComponent={FilterForm ? <FilterForm /> : null}
    />
  </>
);
