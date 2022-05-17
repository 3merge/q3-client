import React from 'react';
import Dialog from 'q3-ui-dialog';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ColumnReorder from '../ColumnReorder';

const ColumnReorderDialog = ({
  children,
  onDone,
  ...rest
}) => (
  <Dialog
    title="tableColumnConfigurator"
    renderTrigger={children}
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
