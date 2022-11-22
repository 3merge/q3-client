import React from 'react';
import PropTypes from 'prop-types';
import Confirm from 'q3-ui-confirm';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Dispatcher } from '../state';
import AuthDelete from '../AuthDelete';
import { useTrashFail } from '../trash/Trash';

const TableTrash = ({ id }) => {
  const { remove } = React.useContext(Dispatcher);
  const catchHandler = useTrashFail();

  return (
    <AuthDelete>
      <Confirm
        title="confirmDelete"
        description="confirmDelete"
        label="delete"
        icon={DeleteForever}
        service={(args) =>
          remove(id)(args).catch(catchHandler)
        }
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

TableTrash.displayName = 'TableTrash';

export default TableTrash;
