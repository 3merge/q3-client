import React from 'react';
import Field from '../Field';
import Form from '.';

const onSubmit = (values) => {
  // eslint-disable-next-line
  console.log(values)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const onReset = () => {
  // eslint-disable-next-line
  alert('Reset!');
};

export default {
  title: 'Q3 Forms|Builders/Form',
  parameters: {
    component: Form,
    componentSubtitle:
      'Easily handle form validation and authorization state',
  },
};

export const WithDebug = () => (
  <Form
    debug
    disabled
    onSubmit={onSubmit}
    onReset={onReset}
    initialValues={{
      email: '',
    }}
  >
    <Field name="email" type="email" required />
  </Form>
);

export const WithDelay = () => {
  const [name, setName] = React.useState('');
  const [lang, setLang] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      setName('Joe');
      setLang('en');
    }, 250);
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      initialValues={{
        name,
        lang,
      }}
    >
      <Field name="name" type="text" />
      <Field
        name="lang"
        type="select"
        options={[{ label: 'English', value: 'en' }]}
      />
    </Form>
  );
};

export const WithCustomButtonLabels = () => (
  <Form
    onSubmit={onSubmit}
    onReset={onReset}
    submitLabel="add"
    resetLabel="startOver"
    enableReset
    initialValues={{
      trips: '',
    }}
  >
    <Field
      collapse={false}
      name="trips"
      type="radio"
      options={[
        {
          value: 'adventure',
          label: 'adventure',
          vars: {
            type: 'Park',
          },
        },
        { value: 'resort', label: 'Resort' },
      ]}
      required
    />
  </Form>
);

export const WithoutDefaultButtons = () => (
  <Form
    onSubmit={onSubmit}
    onReset={onReset}
    enableReset={false}
    enableSubmit={false}
    initialValues={{
      favouriteColors: '',
    }}
  >
    <Field
      name="favouriteColors"
      type="checkset"
      options={[
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
      ]}
    />
  </Form>
);

export const WithListening = () => (
  <Form
    debug
    initialValues={{
      name: 'Fresh',
      dependent: 'Stale',
      other: '',
    }}
  >
    <Field
      name="name"
      type="text"
      helper="This will delete the dependent value on change"
    />
    <Field
      name="dependent"
      type="text"
      listen="name"
      override={({ values }) => ({
        required: values.name.length > 1,
      })}
    />
    <Field
      name="other"
      type="text"
      helper="This remains unaffected at all times"
    />
  </Form>
);

export const WithInlineMessages = () => (
  <Form
    debug
    onSubmit={() => {
      const err = new Error();
      err.message = 'Something terrible as happened';
      err.errors = {
        name: { msg: 'We do not know this person' },
      };

      return Promise.reject(err);
    }}
  >
    <Field name="name" type="text" />
  </Form>
);
