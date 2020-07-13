import React from 'react';
import { act } from 'react-dom/test-utils';
import StepLabel from '@material-ui/core/StepLabel';
import {
  Form,
  Field,
  Repeater,
  Debugger,
  Multistep,
  Fieldset,
} from '../src/builders';
import TextBase from '../src/fields/TextBase';

const setupRepeater = (profile, done) =>
  global.mount(
    <Form
      initialValues={{ profile }}
      unwind={[['profile', 3]]}
      onSubmit={jest.fn()}
    >
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
          'profile.0.email': email,
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
        el.find(TextBase)
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

    it('should match errors inside the Multistep', async () => {
      const err = new Error();
      err.data = {};
      err.data.errors = {
        'friends.1.name': 'We do not know who this is',
      };

      const el = global.mount(
        <Multistep
          initialValues={{
            'friends.0.gender': 'Male',
            'friends.0.name': 'Bill',
            'friends.1.gender': 'Femail',
            'friends.1.name': 'Joe',
          }}
          onSubmit={() => Promise.reject(err)}
        >
          {() => (
            <Fieldset name="socialCircle">
              <Repeater group="friends">
                <Field name="name" type="text" />
              </Repeater>
            </Fieldset>
          )}
        </Multistep>,
      );

      await act(async () =>
        el.find('form').simulate('submit'),
      );

      el.update();
      expect(el.find(StepLabel).props()).toHaveProperty(
        'error',
        true,
      );

      expect(
        el.find(TextBase).last().props(),
      ).toHaveProperty('error', true);
    });
  });
});
