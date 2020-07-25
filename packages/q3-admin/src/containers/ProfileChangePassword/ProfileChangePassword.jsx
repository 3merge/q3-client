import React from 'react';
import axios from 'axios';
import { NewPasswordFields } from 'q3-ui-forms/lib/presets';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { useTranslation } from 'react-i18next';
import TemplateFullWidth from '../../components/TemplateFullWidth';

export default () => {
  const { t } = useTranslation();

  const handleSubmit = React.useCallback(
    (passwords) =>
      axios
        .post('/password-change', passwords)
        .then(() => ({
          message: t('descriptions:changePasswordSuccess'),
        })),
    [],
  );

  return (
    <TemplateFullWidth
      title={t('titles:changePassword')}
      subtitle={t('descriptions:changePassword')}
    >
      <Form
        restart
        showSuccessMessage
        onSubmit={handleSubmit}
      >
        {(values) => (
          <>
            <Field
              name="previousPassword"
              type="password"
              required
              xl={12}
              lg={12}
            />
            <NewPasswordFields {...values} />
          </>
        )}
      </Form>
    </TemplateFullWidth>
  );
};
