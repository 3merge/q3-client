import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import dispatch from '../persistWatcher/dispatch';

const Persist = ({ id }) => {
  const f = useFormikContext();

  React.useEffect(() => {
    const restore = sessionStorage.getItem(id);

    if (restore && f.status === 'Initializing') {
      f.setValues(JSON.parse(restore));
      return;
    }

    if (f.dirty) {
      sessionStorage.setItem(id, JSON.stringify(f.values));
    } else {
      sessionStorage.removeItem(id);
    }

    dispatch({
      dirty: f.dirty,
      id,
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
