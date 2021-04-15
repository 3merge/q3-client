import React from 'react';
import { Form, Field } from '../../builders';
import FieldGroup from './FieldGroup';

describe('FieldGroup', () => {
  it('should show field group children', () => {
    const el = global.mount(
      <Form>
        <FieldGroup label="test">
          <Field name="testing" type="text" />
        </FieldGroup>
      </Form>,
    );

    expect(el.find(Field).exists()).toBeTruthy();
  });

  it('should hide field group children', () => {
    const el = global.mount(
      <Form initialValues={{ foo: 'barz' }}>
        <FieldGroup label="test" conditional={['foo=baz']}>
          <Field name="testing" type="text" />
        </FieldGroup>
      </Form>,
    );

    expect(el.find(Field).exists()).toBeFalsy();
  });
});
