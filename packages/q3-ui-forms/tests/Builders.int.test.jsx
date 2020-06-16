import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  Form,
  Field,
  Repeater,
  Debugger,
} from '../src/builders';
import Textbase from '../src/fields/TextBase';

jest.mock('react-i18next');

const setupRepeater = (profile, done) =>
  global.mount(
    <Form initialValues={{ profile }} onSubmit={jest.fn()}>
      <Repeater group="profile">
        <Field name="email" type="email" />
      </Repeater>
      <Debugger show>
        {(...params) => {
          if (done) done(...params);
          return null;
        }}
      </Debugger>
    </Form>,
  );

describe('Builders', () => {
  describe('Repeater', () => {
    it('should add a row', async () => {
      const el = setupRepeater([{ email: '' }]);

      await act(async () => {
        el.find('.q3-forms-repeater-add')
          .first()
          .simulate('click');
      });

      el.update();
      expect(el.find(Field)).toHaveLength(2);
    });

    it('should remove a row', async () => {
      const email = 'Jonathan@gmail.com';
      const stateWatcher = jest.fn();
      const el = setupRepeater(
        [{ email: 'Mike@gmail.com' }, { email }],
        stateWatcher,
      );

      await act(async () => {
        el.find('.q3-forms-repeater-remove')
          .first()
          .simulate('click');
      });

      el.update();
      expect(el.find(Field)).toHaveLength(1);
      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          'profile.1.email': email,
        },
        {},
      );
    });

    it('should clear state errors when a row is removed', async () => {
      const stateWatcher = jest.fn();
      const el = setupRepeater(
        [{ email: '' }],
        stateWatcher,
      );

      await act(async () => {
        el.find(Textbase)
          .props()
          .onChange({
            target: {
              value: 'Henry',
            },
          });
      });

      el.update();
      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          'profile.0.email': 'Henry',
        },
        {
          'profile.0.email': expect.any(String),
        },
      );

      await act(async () => {
        el.find('.q3-forms-repeater-remove')
          .first()
          .simulate('click');
      });

      el.update();
      expect(stateWatcher).toHaveBeenLastCalledWith({}, {});
    });
  });
});
