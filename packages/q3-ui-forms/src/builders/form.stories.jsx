import React from 'react';
import axios from 'axios';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Container from '@material-ui/core/Container';
import Field from './field';
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
    <Container>
      <Form
        debug
        useFormData
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={{
          firstName: '',
          country: {
            value: 'UK',
            label: 'United Kingdom',
          },
        }}
      >
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
        <Field type="file" name="resume" required />
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
      </Form>
    </Container>
  ))
  .add('With text fields', () => (
    <MockApi>
      <Container>
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
        </Form>
      </Container>
    </MockApi>
  ))
  .add('With nested property names', () => (
    <MockApi>
      <Container>
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
          <Field name="name.firstName" type="text" />
          <Field name="name.lastName" type="text" />
        </Form>
      </Container>
    </MockApi>
  ))
  .add('With  complex fields', () => (
    <MockApi>
      <Container>
        <Form
          debug
          initialValues={{
            firstName: '',
            country: {
              value: 'UK',
              label: 'United Kingdom',
            },
          }}
          onSubmit={(v, actions) =>
            Promise.resolve(() => {
              actions.setFieldError('lorem', 'No good');

              Object.assign(actions, {
                isTouched: true,
              });
            })
          }
        >
          <Field
            name="lorem"
            type="transfer"
            required
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
            name="countryWithCustomOption"
            type="autocomplete"
            loadOptions={loadOptions}
            renderOption={(option) => (
              <div>
                <small>Name</small>
                <br />
                {option.label}
              </div>
            )}
            required
          />

          <Field
            name="trips-dropdown"
            type="select"
            required
            loadOptions={() =>
              Promise.resolve([
                {
                  value: 'adventure',
                  label: 'Adventure',
                },
                { value: 'resort', label: 'Resort' },
              ])
            }
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
        </Form>
      </Container>
    </MockApi>
  ));
