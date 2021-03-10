import React from 'react';
import { Add, List, Table } from '../containers';
import CardView from '../components/CardView';

export default ({
  addComponent: AddForm,
  onNew,
  ...rest
}) => (props) => {
  return (
    <List
      {...rest}
      {...props}
      addComponent={
        AddForm ? (
          <Add onComplete={onNew}>
            <AddForm />
          </Add>
        ) : null
      }
      templateComponent={
        rest?.grid ? (
          <Table {...rest} {...props} />
        ) : (
          <CardView />
        )
      }
    />
  );
};
