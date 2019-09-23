import React from 'react';
import { storiesOf } from '@storybook/react';
import Form from '../form';
import Editor from '.';

storiesOf('Components|Editor', module).add(
  'Formik integration',
  () => (
    <Form
      onSubmit={() => null}
      title="Rich text demo"
      description="This uses TinyMCE. It does not yet match the styles."
    >
      {() => <Editor name="Testing" />}
    </Form>
  ),
);
