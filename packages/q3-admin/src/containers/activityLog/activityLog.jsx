import React from 'react';
import Audit from 'q3-ui-audit';
import { Definitions, Store } from '../state';

const ActivityLog = (props) => (
  <Audit
    collectionName={
      React.useContext(Definitions)?.collectionName
    }
    id={React.useContext(Store)?.data?.id}
    {...props}
  />
);

export default ActivityLog;
