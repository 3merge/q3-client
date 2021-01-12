import React from 'react';
import Repeater from '../../src';
import data from '../fixtures/articles';
import AuthContextProvider from '../fixtures/AuthContextProvider';
import { genRepeaterProps, perform } from '../helpers';

jest.unmock('useful-state');

const getCellValue = (el) => {
  const cells = el.find('td');
  return (pos, expectedValue) =>
    expect(cells.at(pos).text()).toMatch(expectedValue);
};

const getFirstAuthor = (el) =>
  el
    .find('[data-repeater-editable="author"]')
    .first()
    .find('p');

describe('Display', () => {
  describe('atrributes', () => {
    it('should render attributes', () => {
      const el = global.mount(
        <AuthContextProvider>
          <Repeater {...genRepeaterProps()}>
            <div />
          </Repeater>
        </AuthContextProvider>,
      );

      const [{ title, publishedDate }] = data;
      const expectCellTextValue = getCellValue(el);

      expectCellTextValue(0, title);
      expectCellTextValue(1, publishedDate);
      el.unmount();
    });

    it('should hide attributes based on access control', () => {
      const el = global.mount(
        <AuthContextProvider read="!*publishedDate">
          <Repeater {...genRepeaterProps()}>
            <div />
          </Repeater>
        </AuthContextProvider>,
      );

      const expectCellTextValue = getCellValue(el);
      expectCellTextValue(1, '--');
      el.unmount();
    });

    it('should allow editting of attributes', async () => {
      let input;
      const repeaterProps = genRepeaterProps();
      const eventValue = {
        target: {
          value: 'Jon',
        },
      };

      const el = global.mount(
        <AuthContextProvider>
          <Repeater {...repeaterProps}>
            <div />
          </Repeater>
        </AuthContextProvider>,
      );

      await perform(el)([
        async () => {
          getFirstAuthor(el).simulate('click');
        },
        async () => {
          input = el.find('input[name="author"]');
        },
        async () => {
          input.simulate('change', eventValue);
        },
        async () => {
          input.closest('form').simulate('submit');
        },
      ]);

      expect(repeaterProps.editSub).toHaveBeenCalledWith(
        expect.objectContaining({
          author: eventValue.target.value,
        }),
        expect.any(Array),
      );
    });

    it('should disallow editting of attributes', async () => {
      const el = global.mount(
        <AuthContextProvider update="!*author">
          <Repeater {...genRepeaterProps()}>
            <div />
          </Repeater>
        </AuthContextProvider>,
      );

      expect(getFirstAuthor(el).props()).not.toHaveProperty(
        'aria-haspopup',
      );
    });
  });

  describe('nesting', () => {
    it.todo('should render a collapsible row');
    it.todo('should not render a collapsible row');
  });

  describe('searching', () => {
    it.todo('should narrow results on search');
    it.todo(
      'should create dynamic title/description props',
    );
  });
});
