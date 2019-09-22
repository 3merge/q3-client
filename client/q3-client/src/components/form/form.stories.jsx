import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';
import Input from '../inputs';
import Docs from './README.md';
import Form from '.';

storiesOf('Components|Form', module)
  .addParameters({
    jest: ['dialogs'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Default render', () => (
    <Form
      title="My form"
      description="This wrapper passes props along to Formik, such as an initial value for 'Foo'"
      initialValues={{
        foo: 'bar',
      }}
    >
      {() => <Input name="foo" />}
    </Form>
  ))
  .add('With loading state', () => (
    <Form
      title="My form"
      description="The wrapper's underlying Tile component listens for submissions"
    >
      {({ setSubmitting, isSubmitting }) => (
        <Button
          onClick={() => setSubmitting(!isSubmitting)}
          variant="contained"
        >
          Click to toggle loading state
        </Button>
      )}
    </Form>
  ));
