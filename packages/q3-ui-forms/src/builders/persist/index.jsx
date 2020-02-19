import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import dispatch from '../persistWatcher/dispatch';

const Persist = ({ id }) => {
  const storageID = `formik-persistence-${id}`;
  const f = useFormikContext();

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

  return null;
};

Persist.propTypes = {
  /**
   * Form ID to set localStorage.
   */
  id: PropTypes.string.isRequired,
};

export default Persist;
