import React from 'react';
import { IconButton } from '@material-ui/core';
import { invoke } from 'lodash';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Popover from '../Popover';
import PopoverSave from '../PopoverSave';
import PopoverTextField from '../PopoverTextField';

const MediaAltTag = React.forwardRef((props, ref) => (
  <Popover
    button={(buttonProps) => (
      <IconButton
        type="button"
        color="inherit"
        {...buttonProps}
      >
        <ChromeReaderModeIcon />
      </IconButton>
    )}
  >
    {(close) => (
      <PopoverTextField
        label="altAttribute"
        initialValue={invoke(
          ref?.current,
          'getAttribute',
          'alt',
        )}
      >
        {(state) => (
          <PopoverSave
            onClick={(e) => {
              e.preventDefault();
              invoke(
                ref?.current,
                'setAttribute',
                'alt',
                state,
              );

              close();
            }}
          />
        )}
      </PopoverTextField>
    )}
  </Popover>
));

export default MediaAltTag;
