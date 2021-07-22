import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import PollIndicator from '../../components/PollIndicator';
import {
  addDocumentListener,
  removeDocumentListener,
} from '../../hooks/useNotificationsEvent';
import withActionPortal from '../../components/withActionPortal';

export const UnsavedChanges = () => {
  const [hasChange, setHasChange] = React.useState(false);

  const handleEvent = (e) => setHasChange(!e?.data);

  React.useEffect(() => {
    const ev = 'q3-change-detection';
    addDocumentListener(ev, handleEvent);

    return () => {
      removeDocumentListener(ev, handleEvent);
    };
  }, []);

  return (
    <Hidden mdDown implementation="css">
      <PollIndicator hasChange={hasChange} />
    </Hidden>
  );
};

export default withActionPortal(UnsavedChanges, {
  elementId: 'q3-collection-actions-top',
});
