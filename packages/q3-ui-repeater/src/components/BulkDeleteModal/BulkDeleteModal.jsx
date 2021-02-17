import React from 'react';
import PropTypes from 'prop-types';
import { array } from 'q3-ui-helpers';
import Confirm from 'q3-ui-confirm';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Context from '../state';
import Auth from '../Auth';

const BulkDeleteModal = ({ ids, ...rest }) => {
  const { removeBulk } = React.useContext(Context);

  return removeBulk && array.hasLength(ids) ? (
    <Auth op="Delete">
      <Confirm
        icon={DeleteSweepIcon}
        service={removeBulk(ids)}
        title="delete"
        description="delete"
        phrase="DELETE"
        {...rest}
      />
    </Auth>
  ) : null;
};

BulkDeleteModal.propTypes = {
  ids: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
};

export default BulkDeleteModal;
