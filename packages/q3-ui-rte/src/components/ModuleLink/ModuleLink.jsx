import React from 'react';
import { IconButton } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import { invoke, isObject, size } from 'lodash';
import Quill from 'quill';
import Popover from '../Popover';
import PopoverTextField from '../PopoverTextField';
import PopoverSave from '../PopoverSave';

const ModuleLink = React.forwardRef((props, ref) => {
  const { component: Component } = props;
  const [selection, setSelection] = React.useState();

  const handleClick = (next) => (e) => {
    const quill = ref?.current;
    setSelection(invoke(quill, 'getSelection'));
    next(e);
  };

  return (
    <Popover
      button={({ onClick }) =>
        Component ? (
          <Component onClick={handleClick(onClick)} />
        ) : (
          <IconButton
            type="button"
            onClick={handleClick(onClick)}
          >
            <LinkIcon />
          </IconButton>
        )
      }
    >
      {(close) =>
        isObject(selection) ? (
          <PopoverTextField>
            {(state) => (
              <PopoverSave
                onClick={(e) => {
                  e.preventDefault();
                  const quill = ref?.current;
                  if (!isObject(selection) || !size(state))
                    return;
                  quill.format(
                    'link',
                    state,
                    Quill.sources.USER,
                  );

                  quill.update();
                  quill.focus();
                  quill.setSelection(selection);
                  close();
                }}
              />
            )}
          </PopoverTextField>
        ) : (
          'No selection'
        )
      }
    </Popover>
  );
});

export default ModuleLink;
