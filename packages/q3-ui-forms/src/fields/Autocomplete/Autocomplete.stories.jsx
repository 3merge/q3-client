import React from 'react';
import { Form, Field } from '../../builders';
import Autocomplete from '.';
import {
  autocomplete,
  countries,
} from '../__fixtures__/options';

export default {
  title: 'Q3 Forms|Fields/Autocomplete',
  parameters: {
    component: Autocomplete,
    componentSubtitle:
      'Dynamic value select with lazy-loading support',
  },
};

export const WithOptions = () => (
  <Form debug initialValues={{ countries: 'CA' }}>
    <Field
      required
      name="countries"
      type="autocomplete"
      options={countries}
    />
  </Form>
);

export const WithCustomLabel = () => (
  <Form
    debug
    initialValues={{
      countries: { value: '' },
    }}
  >
    <Field
      required
      filter
      name="countries"
      type="autocomplete"
      loadOptions={autocomplete}
      renderOption={(v) => (
        <>
          {v.label}
          <br />
          {v.continent}
        </>
      )}
    />
  </Form>
);
