import React from 'react';
import { storiesOf } from '@storybook/react';
import Field from './field';
import Next from './next';
import Form from './form';

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

storiesOf('Forms|Simple', module).add(
  'With all field types',
  () => (
    <Form
      debug
      initialValues={{ firstName: '' }}
      onSubmit={Promise.resolve}
    >
      <Field
        name="country"
        type="autocomplete"
        loadOptions={loadOptions}
        required
      />
      <Field
        name="trips"
        type="select"
        options={[
          { value: 'adventure', label: 'Adventure' },
          { value: 'resort', label: 'Resort' },
        ]}
        required
      />
      <Field
        name="trips"
        type="radio"
        options={[
          { value: 'adventure', label: 'Adventure' },
          { value: 'resort', label: 'Resort' },
        ]}
        required
      />
      <Field name="firstName" type="text" required />
      <Field name="email" type="email" required />
      <Field name="chips" type="multitext" />
      <Field name="subscribed" type="checkbox" />
      <Field
        name="favouriteColors"
        type="checkset"
        options={[
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
        ]}
      />
      <Field
        name="favouriteColors"
        type="multiselect"
        options={[
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
        ]}
      />
      <Field name="anniversary" type="date" />
      <Field
        name="age"
        conditional={['email=*']}
        type="number"
        min="0"
      />
      <Field
        name="selectable"
        type="selectable"
        options={[
          {
            value: 'foo',
            label: 'foo',
            img:
              'https://images.unsplash.com/photo-1576605330168-8b36a37ddc5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
        ]}
      />
      <Field name="novel" type="editor" required />
      <Next submit />
    </Form>
  ),
);
