import React from 'react';
import Repeater from './Repeater';
import Field from '../Field';
import Form from '../Form';
import { countries } from '../../fields/__fixtures__/options';

const onSubmit = (values) => {
  // eslint-disable-next-line
  console.log(values)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const onReset = () => {
  // eslint-disable-next-line
  alert('Reset!');
};

export default {
  title: 'Q3 Forms|Builders/Repeater',
  parameters: {
    component: Repeater,
    componentSubtitle:
      'Easily handle repeating form fields',
  },
};

export const AsRepeating = () => (
  <Form debug onSubmit={onSubmit} onReset={onReset}>
    <Repeater group="friends">
      <Field name="firstName" type="text" required />
      <Field name="lastName" type="text" required />
      <Field name="email" type="email" required />
      <Field
        name="locations"
        type="select"
        options={countries}
        required
      />
      <Field
        name="country"
        type="autocomplete"
        options={countries}
        required
      />
    </Repeater>
  </Form>
);
