import React from 'react';
import {
  Add,
  Header,
  Search,
  List,
} from 'q3-admin/lib/components';

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
    <List {...ListProps} />
  </>
);
