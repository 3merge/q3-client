import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import useStyle from './style';

const CellAction = ({ component, children }) => {
  const { root } = useStyle();

  return (
    <TableCell className={root} component={component}>
      <div>{children}</div>
    </TableCell>
  );
};

CellAction.defaultProps = {
  children: null,
  component: 'td',
};

CellAction.propTypes = {
  children: PropTypes.node,
  component: PropTypes.string,
};

export default CellAction;
