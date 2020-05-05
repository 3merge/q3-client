import React from 'react';
import debounce from 'debounce-promise';
import Form from '../builders/form';
import Field from '../builders/field';
import Autocomplete from './autocomplete';

const opts = [
  {
    value: 'CA',
    label: 'Canada',
    continent: 'North America',
  },
  {
    value: 'GB',
    label: 'England',
    continent: 'UK',
  },
  {
    value: 'US',
    label: 'United States',
    continent: 'North America',
  },
];

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
      options={opts}
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
      options={opts}
      disableFilter
      renderOption={(v) => (
        <>
          {v.label}
          <br />
          {v.continent}
        </>
      )}
      loadOptions={debounce((e) => {
        return new Promise((resolve) =>
          setTimeout(() => {
            console.log(e);
            resolve(
              opts.filter((item) => {
                return e.split(' ').some((v) => {
                  return (
                    item.label.includes(v) ||
                    item.continent.includes(v)
                  );
                });
              }),
            );
          }, 200),
        );
      }, 500)}
    />
  </Form>
);
