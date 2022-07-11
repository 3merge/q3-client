import React from 'react';
import { size } from 'lodash';
import { useOpen } from 'useful-state';
import {
  Box,
  CircularProgress,
  Button,
  Popover,
  List,
  ListItem,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';

const DirectoryPendingFiles = ({ pending }) => {
  const { anchorEl, open, isOpen, close } = useOpen();
  const { t } = useTranslation('labels');

  return (
    size(pending) > 0 && (
      <Box>
        <Button
          onClick={open}
          startIcon={
            <Box position="relative" width="4rem">
              <Box
                style={{
                  left: '50%',
                  top: 0,
                  position: 'absolute',
                  transform: 'translateY(-50%) scale(.5)',
                }}
              >
                <CircularProgress />
              </Box>
            </Box>
          }
        >
          {t('uploading')}...
        </Button>
        <Popover
          id="pending-files"
          open={isOpen}
          anchorEl={anchorEl}
          onClose={close}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List>
            {pending.map((item) => (
              <ListItem>
                {item.name} {item.size}
              </ListItem>
            ))}
          </List>
        </Popover>
      </Box>
    )
  );
};

export default DirectoryPendingFiles;
