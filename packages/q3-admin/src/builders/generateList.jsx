import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Add,
  Header,
  Search,
  List,
} from 'q3-admin/lib/components';
import { TableRow } from 'q3-ui-datatables';

export default ({
  addFormTitle,
  addForm: AddForm,
  onListItem,
  onSearch,
  ...etc
}) => () => {
  const { t } = useTranslation();
  const ListItem = (props) =>
    React.createElement(TableRow, onListItem(props, t));

  return (
    <>
      <Header>
        <Search intercept={onSearch} />
        <Add title={addFormTitle}>
          <AddForm />
        </Add>
      </Header>
      <List {...etc}>{(rows) => rows.map(ListItem)}</List>
    </>
  );
};
