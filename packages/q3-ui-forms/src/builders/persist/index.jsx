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
    const session = sessionStorage.getItem(storageID);
    const json = JSON.stringify(f.values);

    if (f.isSubmitting && !f.isValidating) {
      sessionStorage.removeItem(storageID);
    } else if (!session && f.dirty) {
      sessionStorage.setItem(storageID, json);
    }

    if (session && f.status === 'Initializing') {
      f.setValues(JSON.parse(session));
    }

    dispatch({ id: storageID });

    return () => {
      sessionStorage.removeItem(storageID);
    };
  }, [f.values, f.dirty, f.isSubmitting, f.isValidating]);

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
