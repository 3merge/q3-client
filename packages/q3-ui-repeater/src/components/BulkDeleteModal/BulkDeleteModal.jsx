import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import Confirm from 'q3-ui-confirm';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { Tooltip, IconButton } from '@material-ui/core';
import { State } from 'q3-ui-exports';
import { useTranslation } from 'q3-ui-locale';
import Context from '../state';
import Auth from '../Auth';

const BulkDeleteModal = () => {
  const { t } = useTranslation('labels');
  const { checked } = React.useContext(State);
  const { disableRemove, removeBulk } =
    React.useContext(Context);

  const ButtonComponent = React.useCallback(
    (props) => (
      <Tooltip arrow title={t('bulkDelete')}>
        <span>
          <IconButton
            {...props}
            color="inherit"
            className="q3-repeater-bulk-delete"
            // eslint-disable-next-line
            disabled={!checked.length || props.disabled}
          >
            <DeleteSweepIcon />
          </IconButton>
        </span>
      </Tooltip>
    ),
    [checked],
  );

  return isFunction(removeBulk) && !disableRemove ? (
    <Auth op="Delete">
      <Confirm
        ButtonComponent={ButtonComponent}
        description="confirmDelete"
        icon={DeleteSweepIcon}
        service={removeBulk(checked)}
        title="confirmDelete"
      />
    </Auth>
  ) : null;
};
BulkDeleteModal.defaultProps = {
  ids: [],
};

BulkDeleteModal.propTypes = {
  ids: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
};

export default React.memo(BulkDeleteModal);
