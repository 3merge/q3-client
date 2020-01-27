import React from 'react';
import Field from './field';
import Form, { FormBuilder } from './form';

const loadOptions = () =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { value: 'Canada', label: 'Canada' },
          { value: 'UK', label: 'United Kingdom' },
          { value: 'US', label: 'United States' },
        ]),
      1500,
    );
  });

const onSubmit = (values) => {
  // eslint-disable-next-line
  alert('Submitted! Check console for form values.');
  // eslint-disable-next-line
  console.log(values);
};

const onReset = () => {
  // eslint-disable-next-line
  alert('Reset!');
};

export default {
  title: 'Form builder',
  parameters: {
    component: FormBuilder,
    componentSubtitle:
      'Easily handle form validation and authorization state',
  },
};

export const DefaultForm = () => (
  <Form
    onSubmit={onSubmit}
    onReset={onReset}
    initialValues={{
      name: 'Jonny',
    }}
  >
    <Field name="name" type="text" />
  </Form>
);

export const WithDebug = () => (
  <Form
    debug
    onSubmit={onSubmit}
    onReset={onReset}
    initialValues={{
      email: '',
    }}
  >
    <Field name="email" type="email" required />
  </Form>
);

export const WithCustomButtonLabels = () => (
  <Form
    onSubmit={onSubmit}
    onReset={onReset}
    submitLabel="add"
    resetLabel="startOver"
    enableReset
    initialValues={{
      trips: '',
    }}
  >
    <Field
      collapse={false}
      name="trips"
      type="radio"
      options={[
        {
          value: 'adventure',
          label: 'Adventure',
        },
        { value: 'resort', label: 'Resort' },
      ]}
      required
    />
  </Form>
);

export const WithoutDefaultButtons = () => (
  <Form
    onSubmit={onSubmit}
    onReset={onReset}
    enableReset={false}
    enableSubmit={false}
    initialValues={{
      favouriteColors: '',
    }}
  >
    <Field
      name="favouriteColors"
      type="checkset"
      options={[
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
      ]}
    />
  </Form>
);
