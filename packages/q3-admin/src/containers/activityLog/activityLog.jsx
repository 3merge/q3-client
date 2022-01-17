import React from 'react';
import Audit from 'q3-ui-audit';
import Dialog from 'q3-ui-dialog';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { Definitions, Store } from '../state';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import withActionPortal from '../../components/withActionPortal';

const ActivityLog = (props) => (
  <Dialog
    renderContent={() => (
      <Audit
        collectionName={
          React.useContext(Definitions)?.collectionName
        }
        data={React.useContext(Store)?.data}
        {...props}
      />
    )}
    renderTrigger={(onClick) => (
      <ButtonWithIcon
        label="audit"
        icon={TrackChangesIcon}
        onClick={onClick}
      />
    )}
    title="audit"
    variant="drawer"
  />
);

export default withActionPortal(ActivityLog, {
  elementId: 'q3-collection-actions-top',
});
