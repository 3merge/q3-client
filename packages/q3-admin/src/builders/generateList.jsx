import React from 'react';
import { Add, Table } from '../containers';
import Grid from '../containers/Grid';

export default ({
  addComponent: AddForm,
  onNew,
  ...rest
}) => (props) => {
  const El = rest.grid ? Grid : Table;

  return (
    <El
      {...rest}
      {...props}
      addComponent={
        AddForm ? (
          <Add onComplete={onNew}>
            <AddForm />
          </Add>
        ) : null
      }
    />
  );
};
