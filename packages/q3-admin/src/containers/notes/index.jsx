import React from 'react';
import Thread from 'q3-ui-thread';
import { Definitions } from '../state';

const Notes = () => (
  <Thread {...React.useContext(Definitions)} />
);

Notes.propTypes = {};

export default Notes;
