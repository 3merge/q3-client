import React from 'react';
import PropTypes from 'prop-types';
import Confirm from 'q3-ui-confirm';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Dispatcher } from '../../containers/state';
import AuthDelete from '../../containers/AuthDelete';
import { useTrashFail } from '../../containers/trash/Trash';

const TableRowTrash = ({ id }) => {
  const { remove } = React.useContext(Dispatcher);
  const catchHandler = useTrashFail();

  return (
    <AuthDelete>
      <Confirm
        title="delete"
        icon={DeleteForever}
        phrase="DELETE"
        service={(args) =>
          remove(id)(args).catch(catchHandler)
        }
      />
    </AuthDelete>
  );
};

TableRowTrash.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

TableRowTrash.displayName = 'TableTrash';

export default TableRowTrash;
