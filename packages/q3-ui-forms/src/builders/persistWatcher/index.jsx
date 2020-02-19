import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import Notify from '../notify';

export const SESSION_STORAGE_EVENT = 'storage';

export const useSessionStorage = (id) => {
  const [
    hasUnsavedChanges,
    setHasUnsavedChanges,
  ] = React.useState(false);

  const onStorage = (e) => {
    if (e.detail.id === id)
      setHasUnsavedChanges(e.detail.dirty);
  };

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(id);
      setHasUnsavedChanges(false);
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

  return [hasUnsavedChanges, clearLocalStorage];
};

export const PersistWatcher = ({ id }) => {
  const [
    hasUnsavedChanges,
    clearLocalStorage,
  ] = useSessionStorage(id);
  const { t } = useTranslation('labels');

  return (
    <Notify
      show={hasUnsavedChanges}
      title={t('unsavedChangesOn', { id })}
    >
      <IconButton
        id={`${id}-persist`}
        aria-label={t('clearChanges')}
        onClick={clearLocalStorage}
        size="small"
      >
        <TrashIcon />
      </IconButton>
    </Notify>
  );
};

PersistWatcher.propTypes = {
  /**
   * Form ID to check localStorage.
   */
  id: PropTypes.string.isRequired,
};

export default PersistWatcher;
