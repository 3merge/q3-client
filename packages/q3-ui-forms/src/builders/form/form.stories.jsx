import React from 'react';
import Tile from 'q3-ui/lib/tile';
import { Router, Link } from '@reach/router';
import MockLocation from 'q3-ui-test-utils/lib/location';
import Field from '../field';
import Form, { FormBuilder } from '.';
import PersistWatcher from '../persistWatcher';

const FORM_ID = 'persistence-demo-form';

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
    component: FormBuilder,
    componentSubtitle:
      'Easily handle form validation and authorization state',
  },
};

const OffPage = () => <p>Blocked!</p>;

const PersistantForm = (props) => {
  return (
    <Tile title="persist">
      <Form
        debug
        isNew
        id={FORM_ID}
        onReset={onReset}
        {...props}
      >
        <Field name="name" type="text" required />
        <Field name="number" type="number" required />
      </Form>
    </Tile>
  );
};

export const DefaultForm = () => {
  const [initialValues, setInitialValues] = React.useState({
    name: '',
    number: 0,
  });

  const handleSubmit = (v) =>
    new Promise((resolve) => {
      setInitialValues(v);
      resolve();
    });

  return (
    <MockLocation initialPath="/">
      <PersistWatcher id={FORM_ID} />
      <Link to="/">To form</Link>
      <Link to="/off">To else</Link>
      <Router>
        <PersistantForm
          path="/"
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
        <OffPage path="off" />
      </Router>
    </MockLocation>
  );
};

export const WithDelay = () => {
  const [name, setName] = React.useState('');
  const [lang, setLang] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      setName('Joe');
      setLang('en');
    }, 150);
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

export const WithDebug = () => (
  <Form
    debug
    onSubmit={onSubmit}
    onReset={onReset}
    initialValues={{
      email: '',
    }}
  >
    <Field name="email" type="email" required />
  </Form>
);

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
