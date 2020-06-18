import React from 'react';
import { act } from 'react-dom/test-utils';
import { Form, Field, Debugger } from '../src/builders';
import MultiSelectMenuItem from '../src/fields/MultiSelectMenuItem';
import { countries } from '../src/fields/__fixtures__/options';

jest.mock('react-i18next');
jest.unmock('useful-state');

const setupForm = (children) => {
  const stateWatcher = jest.fn();
  const el = global.mount(
    <Form onSubmit={jest.fn()}>
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

describe('Builders', () => {
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
          chips: ['CA'],
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
});
