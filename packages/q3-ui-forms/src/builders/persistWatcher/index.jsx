import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import Notify from '../notify';

export const SESSION_STORAGE_EVENT = 'storage';

export const useSessionStorage = () => {
  const [
    unsavedChanges,
    setUnsavedChanges,
  ] = React.useState([]);

  const onStorage = () => {
    const persistentForms = Object.keys(
      sessionStorage,
    ).reduce(
      (curr, key) =>
        key.startsWith('formik-persistence-')
          ? curr.concat(key)
          : curr,
      [],
    );

    setUnsavedChanges(persistentForms);
  };

  const clearLocalStorage = (id) => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(id);
      onStorage();
    }
  };

  React.useEffect(() => {
    window.addEventListener(
      SESSION_STORAGE_EVENT,
      onStorage,
    );

    return () =>
      window.removeEventListener(
        SESSION_STORAGE_EVENT,
        onStorage,
      );
  }, []);

  return [unsavedChanges, clearLocalStorage];
};

export const PersistWatcher = ({ filterById }) => {
  const [
    hasUnsavedChanges,
    clearLocalStorage,
  ] = useSessionStorage();
  const { t } = useTranslation('labels');

  return hasUnsavedChanges
    .filter((v) =>
      filterById ? v.includes(filterById) : true,
    )
    .map((id) => (
      <Notify
        show={hasUnsavedChanges}
        title={t('unsavedChangesOn', {
          id: id.replace('formik-persistence-', '#'),
        })}
      >
        <IconButton
          aria-label={t('clearChanges')}
          onClick={() => clearLocalStorage(id)}
          size="small"
        >
          <TrashIcon />
        </IconButton>
      </Notify>
    ));
};

PersistWatcher.propTypes = {
  /**
   * Form ID to check localStorage.
   */
  id: PropTypes.string.isRequired,
};

export default PersistWatcher;
