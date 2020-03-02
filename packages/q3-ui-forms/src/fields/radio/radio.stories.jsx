import React from 'react';
import Form from '../../builders/form';
import Field from '../../builders/field';
import Checkset from '.';
import { options } from '../__fixtures__/options';

export default {
  title: 'Q3 Forms|Fields/Radio',
  parameters: {
    component: Checkset,
    componentSubtitle: 'Collapsible sets of radio boxes',
  },
};

export const Default = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field name="demo2" type="radio" options={options} />
  </Form>
);

export const WithMaximumVisible = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field
      name="demo2"
      type="radio"
      maxVisible={3}
      options={options}
    />
  </Form>
);

export const WithVariables = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field
      name="demo"
      type="radio"
      options={options.concat({
        value: 'Lorem',
        label: 'loremVars',
      })}
      vars={{ hello: 'world' }}
    />
  </Form>
);
