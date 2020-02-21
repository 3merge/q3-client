import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import dispatch, {
  SESSION_STORAGE_PURGE_EVENT,
} from '../persistWatcher/dispatch';
import {
  setPersistenceName,
  removePersistenceName,
} from './utils';
import useListener from '../persistWatcher/useListener';

const Persist = ({ id }) => {
  const storageID = setPersistenceName(id);
  const f = useFormikContext();

  const onReset = ({ detail }) => {
    if (removePersistenceName(detail.id) === id)
      f.resetForm();
  };

  React.useEffect(() => {
    const restore = sessionStorage.getItem(storageID);

    if (restore && f.status === 'Initializing') {
      f.setValues(JSON.parse(restore));
      return;
    }

    if (f.dirty) {
      sessionStorage.setItem(
        storageID,
        JSON.stringify(f.values),
      );
    } else {
      sessionStorage.removeItem(storageID);
    }

    dispatch({
      dirty: f.dirty,
      id: storageID,
    });
  }, [f.values, f.dirty]);

  useListener(SESSION_STORAGE_PURGE_EVENT, onReset);
  return null;
};

Persist.propTypes = {
  /**
   * Form ID to set localStorage.
   */
  id: PropTypes.string.isRequired,
};

export default Persist;
