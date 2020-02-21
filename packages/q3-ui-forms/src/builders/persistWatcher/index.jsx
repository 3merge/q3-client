import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import Notify from '../notify';
import {
  SESSION_STORAGE_EVENT,
  onPurge,
  isBrowserReady,
} from './dispatch';
import { isPersistence, idify } from '../persist/utils';
import useListener from './useListener';

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
        isPersistence(key) ? curr.concat(key) : curr,
      [],
    );

    setUnsavedChanges(persistentForms);
  };

  const clearLocalStorage = (id) =>
    isBrowserReady(() => {
      sessionStorage.removeItem(id);
      onPurge({ id });
      onStorage();
    });

  useListener(SESSION_STORAGE_EVENT, onStorage);
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
          id: idify(id),
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
  filterById: PropTypes.string,
};

PersistWatcher.defaultProps = {
  filterById: null,
};

export default PersistWatcher;
