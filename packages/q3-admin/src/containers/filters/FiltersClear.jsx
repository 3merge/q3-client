import React from 'react';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const FiltersClear = (props) => {
  const { t } = useTranslation('labels');
  return (
    <Button
      {...props}
      onClick={() => navigate('?active')}
      fullWidth
      size="small"
    >
      {t('clearAll')}
    </Button>
  );
};

FiltersClear.propTypes = {};

export default FiltersClear;
