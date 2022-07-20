import React from 'react';
import { FileManager } from 'q3-ui-filemanager';
import { Definitions } from '../state';

/**
 * How to pass props into this?
 */
const Upload = (props) => (
  <FileManager
    {...props}
    {...React.useContext(Definitions)}
  />
);

export default Upload;
