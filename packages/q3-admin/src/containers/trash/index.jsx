import React from 'react';
import PropTypes from 'prop-types';
import Confirm from 'q3-ui-confirm';
import { useAuth } from 'q3-ui-permissions';
import { useNavigate } from '@reach/router';
import TrashIcon from '@material-ui/icons/DeleteForever';
import connect from '../connect';
import useActionBar from '../../hooks/useActionBar';

export const Trash = ({
  collectionName,
  onDelete,
  directoryPath,
}) => {
  const { Hide } = useAuth(collectionName);
  const navigate = useNavigate();

  const navigateOnResolve = () =>
    onDelete()
      .then(() => {
        navigate(directoryPath);
      })
      .catch(() =>
        // eslint-disable-next-line
        Promise.reject({
          message: 'trashFail',
        }),
      );

  return (
    <Hide op="Delete">
      <Confirm
        variant="drawer"
        title="trash"
        description="trash"
        service={navigateOnResolve}
        phrase="DELETE"
        renderTrigger={(onClick) =>
          useActionBar({
            label: 'trash',
            icon: TrashIcon,
            onClick,
          })
        }
      />
    </Hide>
  );
};

Trash.propTypes = {
  collectionName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  directoryPath: PropTypes.string.isRequired,
};

export default connect(Trash);
