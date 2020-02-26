import React from 'react';
import Wrapper from '.';

// note already wrapped
import Form from '../form';
import Field from '../field';

export default {
  title: 'Q3 Forms|Builders/Wrapper',
  parameters: {
    component: Wrapper(),
    componentSubtitle:
      'HOC Function for passing validation and authentication state into form builders',
  },
};

export const WithKeep = () => (
  <Form
    debug
    initialValues={{ firstName: 'Mike', lastName: 'I' }}
    keep={['firstName']}
  >
    <Field name="firstName" type="text" />
  </Form>
);

export const WithTranslateAndModify = () => (
  <Form
    debug
    // eslint-disable-next-line
    onSubmit={console.log}
    initialValues={{
      firstName: 'Jon',
      surname: 'D',
      behaviour: {
        favourites: { colour: 'Green' },
        music: ['jazz', 'folk'],
      },
    }}
    translate={{
      firstName: 'firstName',
      favouriteColour: 'behaviour.favourites.colour',
      music: 'behaviour.music',
      lastName: 'surname',
    }}
    modify={{
      lastName: [() => 'Doe'],
      music: [(v) => v.concat('country')],
    }}
  >
    <Field name="firstName" type="text" />
    <Field name="lastName" type="text" />
    <Field name="favouriteColour" type="text" />
    <Field
      name="music"
      type="multiselect"
      options={['jazz', 'folk']}
      transformOptions
    />
  </Form>
);

export const WithMarshal = () => (
  <Form
    debug
    onSubmit={(v, actions) => {
      // eslint-disable-next-line
      console.log(v);
      actions.setSubmitting(false);
    }}
    initialValues={{
      destination: {
        country: 'Canada',
      },
      numbers: [
        {
          label: 'One',
          value: 1,
        },
      ],
    }}
    marshal={{
      numbers: [(v) => v.map((item) => item.value)],
    }}
  >
    <Field name="destination.country" type="text" />
    <Field
      name="numbers"
      type="chips"
      options={[
        {
          label: 'One',
          value: 1,
        },
        {
          label: 'Two',
          value: 2,
        },
      ]}
    />
  </Form>
);
