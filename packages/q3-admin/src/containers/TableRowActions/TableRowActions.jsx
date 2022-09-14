import React from 'react';
import PropTypes from 'prop-types';
import TableRowLink from '../../components/TableRowLink';
import TableRowTrash from '../../components/TableRowTrash';

const TableRowActions = (props) => {
  const { id } = props;

  // const customEl = invoke(
  //   props,
  //   'renderCustomRowActions',
  //   args,
  // );

  return (
    <>
      <TableRowTrash id={id} />
      <TableRowLink id={id} />
    </>
  );
};

TableRowActions.propTypes = {
  id: undefined,
};

TableRowActions.defaultProps = {
  id: PropTypes.string,
};

export default TableRowActions;
