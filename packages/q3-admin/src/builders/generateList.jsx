import React from 'react';
import { Add, Header, Search, Table } from '../containers';

export default ({
  addForm: AddForm,
  ListProps,
  AddProps,
  filter,
}) => () => (
  <>
    <Table
      {...ListProps}
      filter={filter}
      addComponent={
        <Add {...AddProps}>
          <AddForm />
        </Add>
      }
    />
  </>
);
