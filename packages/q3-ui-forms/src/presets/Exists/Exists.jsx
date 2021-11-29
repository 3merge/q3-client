import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import Field from '../../builders/Field';

const Exists = (props) => {
  const { t } = useTranslation('labels');

  return (
    <Field
      {...props}
      type="group"
      options={[
        {
          label: t('yes'),
          value: 'exists(true)',
        },
        {
          label: t('no'),
          value: 'exists(false)',
        },
        {
          label: t('either'),
          value: '',
        },
      ]}
    />
  );
};

export default Exists;
