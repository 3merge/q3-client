import React from 'react';
import Form from '../builders/form';
import Field from '../builders/field';
import Chips from './chips';
import { autocomplete } from './__fixtures__/options';

export default {
  title: 'Q3 Forms|Fields/Chips Field',
  parameters: {
    component: Chips,
    componentSubtitle: 'Multiselect chip-style input',
  },
};

export const Example = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field
      type="chips"
      name="demo"
      options={['One', 'Two', 'Three', 'Four']}
      label="lorem"
    />
  </Form>
);

export const AsPopulated = () => (
  <Form debug initialValues={{ demo: ['One', 'Two'] }}>
    <Field
      type="chips"
      name="demo"
      options={['One', 'Two', 'Three', 'Four']}
    />
  </Form>
);

export const AsLabelValuePair = () => (
  <Form debug initialValues={{ demo: [1] }}>
    <Field
      type="chips"
      name="demo"
      loadOptions={() =>
        Promise.resolve([{ value: 1, label: 'One' }])
      }
    />
  </Form>
);

export const AsAutocomplete = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field
      type="chips"
      name="demo"
      loadOptions={autocomplete}
      // filterSelectedOptions={false}
      // minimumCharacterCount={1}
      // disableFilter
    />
  </Form>
);
