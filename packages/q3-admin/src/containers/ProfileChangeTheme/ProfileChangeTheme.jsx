import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import useProfileThemeForm from '../../hooks/useProfileThemeForm';
import SystemPageSub from '../../components/SystemPageSub';

const ProfileChangeTheme = (props) => {
  const { onSubmit, theme, themeOptions } =
    useProfileThemeForm();

  return (
    <SystemPageSub title="appSettings">
      <Form
        {...props}
        isNew
        collectionName="profile"
        keep={['theme']}
        showSuccessMessage
        onSubmit={onSubmit}
        initialValues={{
          theme,
        }}
      >
        <Field
          name="theme"
          type="select"
          required
          options={themeOptions}
          xl={12}
          lg={12}
        />
      </Form>
    </SystemPageSub>
  );
};

export default ProfileChangeTheme;
