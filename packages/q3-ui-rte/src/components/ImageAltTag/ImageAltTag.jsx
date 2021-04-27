import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import Popover from '../Popover';

export const getAltAttribute = (el) =>
  invoke(el, 'getAttribute', 'alt');

export const setAltAttribute = (el, value) =>
  invoke(el, 'setAttribute', 'alt', value);

const ImageAltTag = React.forwardRef((props, ref) => (
  <Popover
    button={props.children}
    initialValue={getAltAttribute(ref?.current)}
    label="altAttribute"
    onSave={(state) => {
      setAltAttribute(ref?.current, state);
    }}
  />
));

ImageAltTag.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageAltTag;
