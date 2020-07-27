import React from 'react';
import { useTranslation } from 'react-i18next';
import Field from '../../builders/Field';

const Has = (props) => {
  const { t } = useTranslation('labels');

  return (
    <Field
      {...props}
      type="group"
      options={[
        {
          label: t('yes'),
          value: 'has(true)',
        },
        {
          label: t('no'),
          value: 'has(false)',
        },
        {
          label: t('either'),
          value: '',
        },
      ]}
    />
  );
};

export default Has;
