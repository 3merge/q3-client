import React from 'react';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'q3-ui-locale';

const FilterByOperation = () => {
  const { t } = useTranslation();

  return (
    <Builders.Field
      label={t('labels:filterByOperation')}
      helperText={t('helpers:filterByOperation')}
      name="operation"
      type="multiselect"
      options={['added', 'deleted', 'updated']}
      xl={12}
      lg={12}
      md={12}
    />
  );
};

export default FilterByOperation;
