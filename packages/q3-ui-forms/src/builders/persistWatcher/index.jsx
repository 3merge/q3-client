import React from 'react';
import { useTranslation } from 'react-i18next';
import Notify from '../notify';

import { listenForChange } from '../../hooks/usePrevious';

export const PersistWatcher = () => {
  const { t } = useTranslation('labels');
  const hasUnsavedChanges = listenForChange();

  return (
    <Notify
      show={hasUnsavedChanges}
      title={t('unsavedChangesOn')}
      label={t('unsavedChanges')}
    />
  );
};

PersistWatcher.propTypes = {};
PersistWatcher.defaultProps = {};

export default PersistWatcher;
