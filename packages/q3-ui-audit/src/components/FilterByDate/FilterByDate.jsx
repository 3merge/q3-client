import React from 'react';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'q3-ui-locale';

const FilterByDate = () => {
  const { t } = useTranslation();

  return (
    <Builders.Field
      name="date"
      type="date"
      label={t('labels:filterByDate')}
      helperText={t('helpers:filterByDate')}
      xl={12}
      lg={12}
      md={12}
    />
  );
};

export default FilterByDate;
