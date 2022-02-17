import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { isFunction } from 'lodash';
import { State } from 'q3-ui-exports';
import {
  Grid,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { useTranslation } from 'q3-ui-locale';
import Auth from '../Auth';
import Context from '../state';

const BulkEditorDrawer = ({ children }) => {
  const { t } = useTranslation('labels');
  const { checked } = React.useContext(State);
  const { disableEditor, editBulk } =
    React.useContext(Context);

  return isFunction(editBulk) && !disableEditor ? (
    <Auth op="Update">
      <Dialog
        title="editMany"
        renderContent={(close) => {
          const args = {
            onSubmit: editBulk(checked, close),
          };

          return typeof children === 'function'
            ? children(args)
            : React.cloneElement(children, args);
        }}
        renderTrigger={(onClick) => (
          <Grid item>
            <Tooltip title={t('bulkUpdate')}>
              <span>
                <IconButton
                  color="inherit"
                  className="q3-repeater-bulk-update"
                  disabled={!checked.length}
                  onClick={onClick}
                >
                  <Edit />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        )}
      />
    </Auth>
  ) : null;
};

BulkEditorDrawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default BulkEditorDrawer;
