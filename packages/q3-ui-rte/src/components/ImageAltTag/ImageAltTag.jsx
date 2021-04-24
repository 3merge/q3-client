import React from 'react';
import { invoke } from 'lodash';
import Popover from '../Popover';
import PopoverSave from '../PopoverSave';
import PopoverTextField from '../PopoverTextField';

const ImageAltTag = React.forwardRef((props, ref) => (
  <Popover button={props.children}>
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

export default ImageAltTag;
