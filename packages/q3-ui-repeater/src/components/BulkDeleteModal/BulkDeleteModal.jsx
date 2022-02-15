import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import Confirm from 'q3-ui-confirm';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import {
  Grid,
  Tooltip,
  IconButton,
} from '@material-ui/core';
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
      <Grid item>
        <Tooltip title={t('bulkDelete')}>
          <span>
            <IconButton
              className="q3-repeater-bulk-delete"
              disabled={!checked.length}
              {...props}
            >
              <DeleteSweepIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
    ),
    [checked],
  );

  return isFunction(removeBulk) && !disableRemove ? (
    <Auth op="Delete">
      <Confirm
        ButtonComponent={ButtonComponent}
        description="delete"
        icon={DeleteSweepIcon}
        phrase="DELETE"
        service={removeBulk(checked)}
        title="delete"
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
