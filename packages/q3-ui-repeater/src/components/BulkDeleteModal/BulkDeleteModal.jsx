import React from 'react';
import PropTypes from 'prop-types';
import { array } from 'q3-ui-helpers';
import Context from '../state';
import { DeleteModalInterior } from '../DeleteModal/DeleteModal';

const BulkDeleteModal = ({ ids, ...rest }) => {
  const { removeBulk } = React.useContext(Context);

  return removeBulk && array.hasLength(ids) ? (
    <DeleteModalInterior
      title="deleteMany"
      service={removeBulk(ids)}
      {...rest}
    />
  ) : null;
};

BulkDeleteModal.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BulkDeleteModal;
