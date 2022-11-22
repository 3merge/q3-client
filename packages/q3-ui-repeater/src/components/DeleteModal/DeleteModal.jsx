import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from 'q3-ui-confirm';
import Auth from '../Auth';
import RepeaterState from '../state';

const DeleteModal = ({ id, ...rest }) => {
  const { remove } = React.useContext(RepeaterState);

  return remove && id ? (
    <Auth op="Delete">
      <Confirm
        icon={DeleteIcon}
        service={remove(id)}
        title="confirmDelete"
        description="confirmDelete"
        {...rest}
      />
    </Auth>
  ) : null;
};

DeleteModal.defaultProps = {
  id: undefined,
};

DeleteModal.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default DeleteModal;
