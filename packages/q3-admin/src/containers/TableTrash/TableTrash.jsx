import React from 'react';
import PropTypes from 'prop-types';
import Confirm from 'q3-ui-confirm';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Dispatcher } from '../state';
import AuthDelete from '../AuthDelete';

const TableTrash = ({ id }) => {
  const { remove } = React.useContext(Dispatcher);

  return (
    <AuthDelete>
      <Confirm
        icon={DeleteForever}
        phrase="TRASH"
        service={remove(id)}
      />
    </AuthDelete>
  );
};

TableTrash.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default TableTrash;
