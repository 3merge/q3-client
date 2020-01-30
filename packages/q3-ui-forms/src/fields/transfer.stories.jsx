import React from 'react';
import { Form, Field } from '../builders';
import Transfer, { Toggle } from './transfer';

export default {
  title: 'Forms/Fields/Transfer',
  paramters: {
    component: Transfer,
    componentSubtitle:
      'Expanded multi-select with search and glob-matching utilities',
  },
};

const options = [
  'Australia',
  'Canada',
  'United States',
  'United Kingdom',
];

export const WithOptions = () => (
  <Form>
    <Field
      name="transfer"
      type="transfer"
      options={options}
    />
  </Form>
);

export const AsPromise = () => (
  <Form initialValues={{ numbers: ['1*'] }}>
    <Field
      name="numbers"
      type="transfer"
      loadOptions={() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(options);
          }, 1500);
        })
      }
      disabled
    />
  </Form>
);

export const AsDisabled = () => (
  <Form initialValues={{ numbers: ['1*'] }}>
    <Field
      name="numbers"
      type="transfer"
      options={['1', '2']}
      disabled
    />
  </Form>
);

export const ToggleButton = () => (
  <Toggle
    open={() => null}
    label="My first transfer!"
    applied={['1', '2']}
  />
);
