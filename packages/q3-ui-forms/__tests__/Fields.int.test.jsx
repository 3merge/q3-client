import React from 'react';
import { act } from 'react-dom/test-utils';
import { Form, Field, Debugger } from '../src/builders';
import MultiSelectMenuItem from '../src/fields/MultiSelectMenuItem';
import { countries } from '../src/fields/__fixtures__/options';

jest.unmock('useful-state');

const setupForm = (children, props) => {
  const stateWatcher = jest.fn();
  const el = global.mount(
    <Form onSubmit={Promise.resolve} {...props}>
      {children}
      <Debugger show>
        {(...params) => {
          stateWatcher(...params);
          return null;
        }}
      </Debugger>
    </Form>,
  );

  return [el, stateWatcher];
};

const selectCanadaFromDropdown = async (el) => {
  const input = el.find('input');

  await act(async () => {
    input.simulate('change', {
      // Fixtures contains "Canada"
      target: { value: 'Can' },
    });
  });

  await act(async () => {
    input.simulate('keyDown', { key: 'ArrowDown' });
    input.simulate('keyDown', { key: 'Enter' });
  });

  el.update();
  return el;
};

describe('Fields', () => {
  describe('Autocomplete', () => {
    it('should select an option', async () => {
      const [el, stateWatcher] = setupForm(
        <Field
          name="autocomplete"
          type="autocomplete"
          options={countries}
        />,
      );

      await selectCanadaFromDropdown(el);

      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          autocomplete: expect.objectContaining({
            value: 'CA',
          }),
        },
        {},
      );
    });
  });

  describe('Chips', () => {
    it('select an option', async () => {
      const [el, stateWatcher] = setupForm(
        <Field
          name="chips"
          type="chips"
          options={countries}
        />,
      );

      await selectCanadaFromDropdown(el);
      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          chips: [expect.objectContaining({ value: 'CA' })],
        },
        {},
      );
    });
  });

  describe('MutliSelect', () => {
    it('select an option', async () => {
      const [el, stateWatcher] = setupForm(
        <Field
          name="multiselect"
          type="multiselect"
          options={countries}
        />,
      );

      await act(async () => {
        el.find('.MuiSelect-select').props().onKeyDown({
          preventDefault: jest.fn(),
          key: 'Enter',
        });
      });

      el.update();

      await act(async () => {
        el.find(MultiSelectMenuItem)
          .first()
          .simulate('click');
      });

      el.update();
      expect(stateWatcher).toHaveBeenLastCalledWith(
        {
          multiselect: ['CA'],
        },
        {},
      );
    });
  });

  describe('MutliText', () => {
    it('should validate invalid data', async () => {
      const [el, stateWatcher] = setupForm(
        <Field
          name="multitext"
          type="multitext"
          of="email"
        />,
        {
          initialValues: {
            multitext: ['foo'],
          },
        },
      );

      await act(async () => {
        el.find('form').simulate('submit');
      });

      el.update();
      expect(stateWatcher).toHaveBeenLastCalledWith(
        { multitext: ['foo'] },
        { multitext: expect.any(Array) },
      );
    });
  });
});
