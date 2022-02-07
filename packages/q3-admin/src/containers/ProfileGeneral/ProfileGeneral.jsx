import React from 'react';
import { Grid } from '@material-ui/core';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { handleFormData } from 'q3-ui-forms/lib/helpers';
import { Container } from '@material-ui/core';
import useProfileForm from '../../hooks/useProfileForm';
import ProfilePhoto from '../ProfilePhoto';

const ProfileGeneral = (props) => {
  const { initialValues, onSubmit } = useProfileForm();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <ProfilePhoto />
        </Grid>
        <Grid item xs>
          <Form
            {...props}
            keep={[
              'firstName',
              'lastName',
              'email',
              'timezone',
              'lang',
            ]}
            showSuccessMessage
            initialValues={initialValues}
            onSubmit={handleFormData(onSubmit)}
          >
            <Field
              name="firstName"
              type="text"
              required
              xl={6}
            />
            <Field
              name="lastName"
              type="text"
              required
              xl={6}
            />
            <Field
              name="email"
              type="email"
              required
              xl={6}
            />
            <Field
              name="theme"
              type="select"
              options={['dark', 'light']}
              xl={6}
            />
            <Field
              name="lang"
              type="select"
              // get supportedLngs
              options={[]}
              required
              xl={6}
            />
            <Field
              name="timezone"
              type="select"
              options={[]}
              required
              xl={6}
            />
          </Form>
        </Grid>
      </Grid>
    </Container>
  );
};

ProfileGeneral.propTypes = {};
ProfileGeneral.defaultProps = {};

export default ProfileGeneral;
