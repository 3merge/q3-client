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

export const WithPick = () => (
  <Form
    debug
    initialValues={{ firstName: 'Mike', lastName: 'I' }}
    pick={['firstName']}
  >
    <Field name="firstName" type="text" />
  </Form>
);

export const WithMapPick = () => (
  <Form
    debug
    initialValues={{
      firstName: 'Mike',
      behaviour: { favouriteColour: 'Green' },
      surname: 'I',
    }}
    pick={['firstName', 'lastName', 'favouriteColour']}
    mapPick={(shape) => ({
      ...shape,
      lastName: shape.surname,
      favouriteColour: shape.behaviour.favouriteColour,
    })}
  >
    <Field name="firstName" type="text" />
    <Field name="lastName" type="text" />
    <Field name="favouriteColour" type="text" />
  </Form>
);
