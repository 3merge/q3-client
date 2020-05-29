import React from 'react';
import Form from '../builders/form';
import Field from '../builders/field';
import Autocomplete from './autocomplete';
import {
  autocomplete,
  countries,
} from './__fixtures__/options';

export default {
  title: 'Q3 Forms|Fields/Autocomplete',
  parameters: {
    component: Autocomplete,
    componentSubtitle:
      'Dynamic value select with lazy-loading support',
  },
};

export const WithOptions = () => (
  <Form
    debug
    initialValues={{
      countries: { value: '' },
    }}
  >
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
      name="countries"
      type="autocomplete"
      filterSelectedOptions={false}
      loadOptions={autocomplete}
      disableFilter
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
