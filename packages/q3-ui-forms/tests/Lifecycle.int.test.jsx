import React from 'react';
import { act } from 'react-dom/test-utils';
import { Form, Field, Message } from '../src/builders';
import TextBase from '../src/fields/TextBase';

jest.mock('react-i18next');

describe('Lifecycle', () => {
  it('should report field-level errors', async () => {
    const err = new Error();
    err.message = 'Inlined message';
    err.errors = {
      email: {
        msg: 'This is bad data',
      },
    };

    const el = global.mount(
      <Form
        initialValues={{ email: 'mibberson@3merge.ca' }}
        onSubmit={() => Promise.reject(err)}
      >
        <Field name="email" type="email" />
      </Form>,
    );

    await act(async () => {
      el.find('form').props().onSubmit({
        preventDefault: jest.fn(),
      });
    });

    el.update();

    expect(el.find(Message).text()).toMatch(err.message);
    expect(el.find(TextBase).props()).toHaveProperty(
      'error',
      true,
    );

    expect(el.find(TextBase).props()).toHaveProperty(
      'helperText',
      err.errors.email.msg,
    );
  });
});
