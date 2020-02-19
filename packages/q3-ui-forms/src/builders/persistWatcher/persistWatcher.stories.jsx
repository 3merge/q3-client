import React from 'react';
import Button from '@material-ui/core/Button';
import PersistWatcher from '.';
import dispatch from './dispatch';

export default {
  title: 'Q3 Forms|Builders/Persist Watcher',
  parameters: {
    component: PersistWatcher,
    componentSubtitle:
      'Session-storage synced Notify component to detect unsaved form changes',
  },
};

export const InSessionStorage = () => {
  const id = 'session-storage-demo';

  const setSession = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        `formik-persistence-${id}`,
        '{{foo:bar}}',
      );
      dispatch({ id, dirty: true });
    }
  };

  return (
    <>
      <PersistWatcher id={id} />
      <Button onClick={setSession}>
        Click to set session variable
      </Button>
    </>
  );
};
