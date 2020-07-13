import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Box from '@material-ui/core/Box';
import { TITLE_TEXT_LONG } from '../__fixtures__/dummy-content';
import image from '../__fixtures__/gatsby-image';
import HeaderWithForm from './HeaderWithForm';

export default {
  title: 'Q3 Blocks|Headers/WithForm',
  decorators: [withA11y],
};

export const WithForm = () => (
  <HeaderWithForm
    title={TITLE_TEXT_LONG}
    description={[
      TITLE_TEXT_LONG,
      TITLE_TEXT_LONG,
      TITLE_TEXT_LONG,
    ].join(' ')}
    imageProps={image}
  >
    <Box p={2}>
      <Form initialValue={{ firstName: '', lastName: '' }}>
        <Field name="firstName" type="text" xl={6} lg={6} />
        <Field name="lastName" type="text" xl={6} lg={6} />
        <Field name="email" type="text" xl={12} lg={12} />
      </Form>
    </Box>
  </HeaderWithForm>
);
