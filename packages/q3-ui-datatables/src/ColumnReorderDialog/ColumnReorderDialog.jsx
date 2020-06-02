import React from 'react';
import Dialog from 'q3-ui-dialog';
import IconButton from 'q3-ui/lib/iconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TuneIcon from '@material-ui/icons/Tune';
import ColumnReorder from '../ColumnReorder';

const ColumnReorderDialog = ({
  onDone,
  disabled,
  ...rest
}) => (
  <Dialog
    title="tableConfigurator"
    variant="drawer"
    renderTrigger={(onClick) => (
      <Box width={35} id="q3-datatable-reorder">
        <IconButton
          label="configure"
          icon={TuneIcon}
          buttonProps={{
            size: 'small',
            disabled,
            onClick,
          }}
        />
      </Box>
    )}
    renderContent={(close) => (
      <ColumnReorder {...rest}>
        {(checked) => (
          <Box p={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                onDone(checked);
                close();
              }}
            >
              Apply
            </Button>
          </Box>
        )}
      </ColumnReorder>
    )}
  />
);

export default ColumnReorderDialog;
