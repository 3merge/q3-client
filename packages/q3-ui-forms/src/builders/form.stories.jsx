import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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

storiesOf('Forms|Simple', module)
  .add('With toggles', () => (
    <MockApi>
      <Form
        debug
        initialValues={{
          firstName: '',
          country: {
            value: 'UK',
            label: 'United Kingdom',
          },
        }}
        onSubmit={Promise.resolve}
      >
        <Container>
          <Field
            collapse={false}
            name="trips-radio"
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
            name="selectable"
            type="selectable"
            options={[
              {
                value: 'foo',
                label: 'foo',
                img:
                  'https://images.unsplash.com/photo-1576605330168-8b36a37ddc5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
              },
              {
                value: 'bar',
                label: 'bar',
                img:
                  'https://images.unsplash.com/photo-1576605330168-8b36a37ddc5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
              },
            ]}
          />
          <Next submit />
        </Container>
      </Form>
    </MockApi>
  ))
  .add('With text fields', () => (
    <MockApi>
      <Form
        debug
        initialValues={{
          firstName: '',
          country: {
            value: 'UK',
            label: 'United Kingdom',
          },
        }}
        onSubmit={Promise.resolve}
      >
        <Container>
          <Field name="email" type="email" />
          <Field name="postal" type="postal" />
          <Field name="tel" type="tel" />
          <Field name="anniversary" type="date" />
          <Field
            name="age"
            conditional={['email=*']}
            type="number"
            min="0"
          />
          <Field
            type="text"
            name="comment"
            multiline
            rows={5}
          />
          <Field name="novel" type="editor" required />
          <Next submit />
        </Container>
      </Form>
    </MockApi>
  ))
  .add('With nested property names', () => (
    <MockApi>
      <Form
        debug
        onSubmit={Promise.resolve}
        initialValues={{
          name: {
            firstName: 'Jon',
            lastName: 'Doe',
          },
        }}
      >
        <Container>
          <Field name="name.firstName" type="text" />
          <Field name="name.lastName" type="text" />
        </Container>
      </Form>
    </MockApi>
  ))
  .add('With  complex fields', () => (
    <MockApi>
      <Form
        debug
        initialValues={{
          firstName: '',
          country: {
            value: 'UK',
            label: 'United Kingdom',
          },
        }}
        onSubmit={Promise.resolve}
      >
        <Container>
          <Field
            name="counting"
            type="transfer"
            loadOptions={() =>
              Promise.resolve(['Uno', 'Dos', 'Tres'])
            }
          />
          <Field
            name="country"
            type="autocomplete"
            loadOptions={loadOptions}
            required
          />
          <Field
            name="trips-dropdown"
            type="select"
            required
            options={[
              {
                value: 'adventure',
                label: 'Adventure',
              },
              { value: 'resort', label: 'Resort' },
            ]}
            override={({ values }) =>
              values.country &&
              values.country.value === 'Canada'
                ? {
                    required: false,
                  }
                : null
            }
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
          <Next submit />
        </Container>
      </Form>
    </MockApi>
  ));
