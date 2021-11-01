import React from 'react';
import PropTypes from 'prop-types';
import Confirm from 'q3-ui-confirm';
import { useAuth } from 'q3-ui-permissions';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Dispatcher, Definitions } from '../state';

export const TableTrash = ({ id }) => {
  const { remove } = React.useContext(Dispatcher);
  const { collectionName } = React.useContext(Definitions);
  const { canDelete } = useAuth(collectionName);

  return (
    canDelete && (
      <Confirm
        title="confirm"
        description="confirm"
        service={remove(id)}
        phrase="DELETE"
        icon={DeleteForever}
      />
    )
  );
};

TableTrash.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TableTrash;
