import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Form from '../builders/form';
import Field from '../builders/field';
import Select from './select';

const opts = [
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'US', label: 'United States' },
];

export default {
  title: 'Q3 Forms|Fields/Select',
  parameters: {
    component: Select,
    componentSubtitle: 'Desktop-native select input',
  },
};

export const WithLoadOptions = () => (
  <Form
    onSubmit={() => null}
    initialValues={{
      countries: opts[0].value,
    }}
  >
    <Field
      name="countries"
      type="select"
      loadOptions={() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(opts);
          }, 2000);
        })
      }
    />
  </Form>
);

export const WithOptions = () => (
  <Form
    onSubmit={() => null}
    initialValues={{
      countries: opts[1].value,
    }}
  >
    <Field name="countries" type="select" options={opts} />
  </Form>
);

export const WithDynamicOptions = () => (
  <Form
    onSubmit={() => null}
    initialValues={{
      countries: '',
      name: '',
    }}
  >
    <Field name="name" type="text" />
    <Field
      name="countries"
      type="select"
      options={[]}
      override={({ values }) => ({
        options: values.name.length
          ? opts
          : [{ label: 'Brazil', value: 'BZ' }],
      })}
    />
  </Form>
);

export const WithDynamicLoadOptions = () => (
  <Form
    onSubmit={() => null}
    initialValues={{
      countries: '',
      name: '',
    }}
  >
    <Field name="name" type="text" />
    <Field name="age" type="number" />
    <Field
      name="countries"
      type="select"
      runOnChange={['name']}
      loadOptions={() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(opts);
          }, 2000);
        })
      }
    />
  </Form>
);
