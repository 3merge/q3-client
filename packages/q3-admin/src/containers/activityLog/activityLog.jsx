import React from 'react';
import Audit from 'q3-ui-audit';
import { Definitions } from '../state';

const ActivityLog = () => (
  <Audit {...React.useContext(Definitions)} />
);

export default ActivityLog;
