import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { castToUTC } from 'q3-ui-forms/lib/helpers';
import useProfileForm from '../../hooks/useProfileForm';
import SystemPageSub from '../../components/SystemPageSub';

const ProfileChangeContact = (props) => {
  const { initialValues, onSubmit } = useProfileForm();

  return (
    <SystemPageSub title="contactInformation">
      <Form
        {...props}
        isNew
        collectionName="profile"
        keep={[
          'firstName',
          'lastName',
          'tel',
          'email',
          'occupation',
          'birthday',
        ]}
        showSuccessMessage
        initialValues={initialValues}
        onSubmit={onSubmit}
        marshalSelectively
        marshal={{
          birthday: [castToUTC],
        }}
      >
        <Field
          name="firstName"
          type="text"
          required
          xl={12}
          lg={12}
        />
        <Field
          name="lastName"
          type="text"
          required
          xl={12}
          lg={12}
        />
        <Field
          name="email"
          type="email"
          required
          xl={12}
          lg={12}
        />
        <Field name="tel" type="tel" xl={12} lg={12} />
        <Field name="occupation" xl={12} lg={12} />
        <Field
          name="birthday"
          type="date"
          xl={12}
          lg={12}
        />
      </Form>
    </SystemPageSub>
  );
};

export default ProfileChangeContact;
