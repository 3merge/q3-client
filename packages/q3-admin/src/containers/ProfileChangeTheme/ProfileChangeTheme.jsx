import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import useProfileForm from '../../hooks/useProfileForm';
import SystemPageSub from '../../components/SystemPageSub';

const ProfileChangeTheme = (props) => {
  const { initialValues, onSubmit } = useProfileForm();

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
          theme: initialValues || 'light',
        }}
      >
        <Field
          name="theme"
          type="select"
          required
          options={['dark', 'light']}
          xl={12}
          lg={12}
        />
      </Form>
    </SystemPageSub>
  );
};

export default ProfileChangeTheme;
