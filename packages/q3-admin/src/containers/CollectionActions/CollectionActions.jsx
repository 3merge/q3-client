import React from 'react';
import { Fade, Box } from '@material-ui/core';
import TableIo from '../TableIo';
import { Store } from '../state';
import Add from '../add';
import { useAppContext } from '../../hooks';

const List = ({ addComponent: AddForm, io }) => {
  const tableProps = React.useContext(Store);

  const { can } = useAppContext({
    io: <TableIo io={io} data={tableProps.data} />,
    add: AddForm ? (
      <Add>
        <AddForm />
      </Add>
    ) : null,
  });

  return (
    <Fade in timeout={750}>
      <Box display="flex" whiteSpace="nowrap">
        {can('io')}
        {can('add')}
      </Box>
    </Fade>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
