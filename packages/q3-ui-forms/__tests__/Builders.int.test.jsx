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

const setupRepeater = (profile, done, options = {}) =>
  global.mount(
    <Form
      initialValues={{
        ...(profile
          ? {
              profile,
            }
          : {}),
      }}
      unwind={[['profile', 3]]}
      onSubmit={jest.fn()}
    >
      <Repeater group="profile" {...options}>
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

const interactWithRepeaterElement = (el) => {
  const REMOVE_CLS = '.q3-forms-repeater-remove';

  const actAndUpdateEl = async (callback) => {
    await act(callback);
    el.update();
  };

  const findAndSimulateClick = (selector) =>
    el.find(selector).first().simulate('click');

  return {
    addRow: async () =>
      actAndUpdateEl(async () => {
        findAndSimulateClick('.q3-forms-repeater-add');
      }),

    getRemoveRowButton: () =>
      el.find(REMOVE_CLS).first().props(),

    hasFields: (expectedNumberOfFields) =>
      expect(el.find(Field)).toHaveLength(
        expectedNumberOfFields,
      ),

    removeRow: async () =>
      actAndUpdateEl(async () => {
        findAndSimulateClick(REMOVE_CLS);
      }),

    type: async (value) =>
      actAndUpdateEl(async () => {
        el.find(TextBase).props().onChange({
          target: {
            value,
          },
        });
      }),
  };
};

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

      const interact = interactWithRepeaterElement(
        setupRepeater(
          [{ email: 'Mike@gmail.com' }, { email }],
          stateWatcher,
        ),
      );

      await interact.removeRow();
      interact.hasFields(1);

      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          'profile.0.email': email,
        },
        {},
        [],
      );
    });

    it('should require and init the first row', async () => {
      const stateWatcher = jest.fn();
      const interact = interactWithRepeaterElement(
        setupRepeater(undefined, stateWatcher, {
          min: 1,
        }),
      );

      interact.hasFields(1);

      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          'profile': [{ email: '' }],
        },
        {},
        [],
      );

      expect(interact.getRemoveRowButton()).toHaveProperty(
        'disabled',
        true,
      );
    });

    it('should clear state errors when a row is removed', async () => {
      const stateWatcher = jest.fn();
      const interact = interactWithRepeaterElement(
        setupRepeater([{ email: '' }], stateWatcher),
      );

      await interact.type('Henry');

      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          'profile.0.email': 'Henry',
        },
        {
          'profile.0.email': expect.any(String),
        },
        [],
      );

      await interact.addRow();
      await interact.removeRow();

      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          'profile.0.email': '',
        },
        {},
        [],
      );
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
