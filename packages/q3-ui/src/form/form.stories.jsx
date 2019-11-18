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
      title="demo"
      subtitle="demo"
      initialValues={{
        foo: 'bar',
      }}
    >
      {() => <Input name="foo" />}
    </Form>
  ))
  .add('With loading state', () => (
    <Form
      title="example"
      dividers={false}
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
