import React from 'react';
import Box from '@material-ui/core/Box';
import { Form, Field } from '../builders';
import Select from './Select';

const opts = [
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'US', label: 'United States' },
];

export default {
  title: 'Q3 Forms/Fields/Select',
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

export const WithMultiSelect = () => (
  <Box p={1}>
    <Form
      debug
      onSubmit={console.log}
      initialValues={{
        countries: opts[1].value,
      }}
    >
      <Field
        name="countries"
        type="multiselect"
        options={opts}
      />
    </Form>
  </Box>
);

export const WithDynamicOptions = () => (
  <Form onSubmit={() => null}>
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

export const WithGraphics = () => (
  <Form
    onSubmit={() => null}
    initialValues={{
      countries: '',
      name: '',
    }}
  >
    <Field
      name="countries"
      type="selectable"
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
  <Form debug onSubmit={() => null}>
    <Field name="name" type="text" />
    <Field name="age" type="number" />
    <Field
      name="countries"
      type="select"
      runOnChange={['name']}
      loadOptions={(e, state) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(opts);
          }, 2000);
        })
      }
    />
  </Form>
);
