import React from 'react';
import { Add, Header, Search, Table } from '../containers';

export default ({
  addForm: AddForm,
  onSearch,
  ListProps,
  AddProps,
}) => () => (
  <>
    <Header>
      <Search intercept={onSearch} />
      <Add {...AddProps}>
        <AddForm />
      </Add>
    </Header>
    <Table {...ListProps} />
  </>
);
