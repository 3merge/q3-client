import React from 'react';
import PropTypes from 'prop-types';
import { isObject, invoke } from 'lodash';
import Popover from '../Popover';
import PopoverSave from '../PopoverSave';
import PopoverTextField from '../PopoverTextField';

export const getAltAttribute = (el) => {
  return invoke(el, 'getAttribute', 'alt');
};

export const setAltAttribute = (el, value, next) => (e) => {
  if (isObject(e)) e.preventDefault();
  invoke(el, 'setAttribute', 'alt', value);
  next();
};

const ImageAltTag = React.forwardRef((props, ref) => (
  <Popover button={props.children}>
    {(close) => (
      <PopoverTextField
        label="altAttribute"
        initialValue={getAltAttribute(ref?.current)}
      >
        {(state) => (
          <PopoverSave
            onClick={setAltAttribute(
              ref?.current,
              state,
              close,
            )}
          />
        )}
      </PopoverTextField>
    )}
  </Popover>
));

ImageAltTag.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageAltTag;
