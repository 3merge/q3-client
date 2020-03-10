import React from 'react';
import Tile from 'q3-ui/lib/tile';
import Field from '../field';
import Form from '../form';
import Validate from '.';
import { options } from '../../fields/__fixtures__/options';

export default {
  title: 'Q3 Forms|Builders/Validate',
  component: Validate,
};

export const ValidateOnMount = () => (
  <Tile
    title="Validate on mount"
    subtitle="Regardless the initial state, validation will run and flag errors"
  >
    <Form
      validateOnMount
      initialValues={{
        name: '',
        number: 0,
        postal: '',
        tel: '',
      }}
    >
      <Field name="name" type="text" required />
      <Field name="number" type="number" required />
      <Field name="postal" type="postal" />
      <Field name="tel" type="tel" />
      <Field name="age" type="number" />
      <Field name="checkbox" type="checkbox" />
      <Field name="checkbox" type="checkbox" simple />
    </Form>
  </Tile>
);

export const ValidateDisabledOnMount = () => (
  <Tile
    title="Disabled validation on mount"
    subtitle="Most useful for forms yet to receive user text entry"
  >
    <Form
      validateOnMount={false}
      initialValues={{
        email: '',
        tel: '',
      }}
    >
      <Field name="email" type="email" required />
      <Field name="tel" type="tel" required />
    </Form>
  </Tile>
);

export const ValidateOnSchemaChange = () => (
  <Tile
    title="Validation schema re-initialization"
    subtitle="For inputs using the override, the validation needs to adjust itself after mounting"
  >
    <Form
      initialValues={{
        email: '',
        tel: '',
      }}
    >
      <Field name="email" type="email" required />
      <Field name="postal" type="postal" />
      <Field
        name="tel"
        type="tel"
        override={({ values }) => ({
          required: Boolean(values.email.length),
        })}
      />
    </Form>
  </Tile>
);

export const ValidatePostRequest = () => (
  <Tile
    title="Validation reset on request error"
    subtitle="When errors occur outside Formik state, the form must reset"
  >
    <Form
      debug
      initialValues={{
        email: '',
        options: '',
        example: '',
        autocomplete: '',
        transfer: '',
        chips: '',
        multiselect: [],
      }}
      onSubmit={(values, actions) => {
        actions.setFieldError('email', 'Err!');
        actions.setFieldError('options', 'Err!');
        actions.setFieldError('autocomplete', 'Err!');
        actions.setFieldError('example', 'Err!');
        actions.setFieldError('transfer', 'Err!');
        actions.setFieldError('chips', 'Err!');
        actions.setFieldError('multiselect', 'Err!');
        actions.setSubmitting(false);
      }}
    >
      <Field name="email" type="email" required />
      <Field
        name="transfer"
        type="transfer"
        loadOptions={() =>
          Promise.resolve(options.map(({ value }) => value))
        }
      />
      <Field
        name="options"
        type="select"
        options={options}
      />
      <Field
        name="autocomplete"
        type="autocomplete"
        loadOptions={() => Promise.resolve(options)}
      />
      <Field name="chips" type="chips" options={options} />
      <Field
        name="multiselect"
        type="multiselect"
        options={options}
      />
      <Field name="example" type="checkbox" />
    </Form>
  </Tile>
);

export const ValidateInlineMsg = () => (
  <Tile
    title="Inline messages"
    subtitle="When errors occur, show a global message"
  >
    <Form
      debug
      initialValues={{
        email: '',
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        actions.setStatus(
          `${
            values.email === 'foo@bar.com'
              ? 'Success'
              : 'Error'
          }:lorem`,
        );
      }}
    >
      <Field name="email" type="email" required />
    </Form>
  </Tile>
);
