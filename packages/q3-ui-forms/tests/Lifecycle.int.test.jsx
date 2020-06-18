import React from 'react';
import { act } from 'react-dom/test-utils';
import { countries } from '../src/fields/__fixtures__/options';
import { Form, Field, Message } from '../src/builders';
import TextBase from '../src/fields/TextBase';

jest.mock('react-i18next');

const expectErrorProperty = (el) =>
  // everything resolves into the TextBase
  expect(el.find(TextBase).props()).toHaveProperty(
    'error',
    true,
  );

const expectHelperTextProperty = (el, value) =>
  expect(el.find(TextBase).props()).toHaveProperty(
    'helperText',
    value,
  );

describe('Lifecycle', () => {
  it('should catch field-levels errors prior to attempting onSubmit', async () => {
    const onSubmit = jest.fn();
    const el = global.mount(
      <Form onSubmit={onSubmit}>
        <Field
          name="country"
          type="select"
          options={countries}
          required
        />
      </Form>,
    );

    await act(async () =>
      el.find('form').props().onSubmit({
        preventDefault: jest.fn(),
      }),
    );

    el.update();
    expect(onSubmit).not.toHaveBeenCalled();
    expectErrorProperty(el);
    expectHelperTextProperty(el, expect.any(String));
  });

  it('should report field-level errors from onSubmit', async () => {
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
    expectErrorProperty(el);
    expectHelperTextProperty(el, err.errors.email.msg);
  });
});
