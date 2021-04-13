import React from 'react';
import { act } from 'react-dom/test-utils';
import Repeater from '../../src';
import data from '../fixtures/articles';
import AuthContextProvider from '../fixtures/AuthContextProvider';
import { genRepeaterProps, perform } from '../helpers';
import RepeaterTable from '../../src/components/RepeaterTable';
import Item from '../../src/components/Item';

jest.unmock('useful-state');

const reducer = jest.spyOn(React, 'useReducer');

afterEach(() => {
  jest.clearAllMocks();
});

const getCellValue = (el) => {
  const cells = el.find('td');
  return (pos, expectedValue) =>
    expect(cells.at(pos).text()).toMatch(expectedValue);
};

const getFirstAuthor = (el, selector) =>
  el
    .find('[data-repeater-editable="author"]')
    .first()
    .find(selector);

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
          getFirstAuthor(el, 'button').simulate('click');
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

      expect(
        getFirstAuthor(el, 'p').props(),
      ).not.toHaveProperty('aria-haspopup');
    });
  });

  describe('nesting', () => {
    const Component = () => (
      <div className="nested">Here</div>
    );

    it.each([
      [Component, true],
      [null, false],
    ])(
      'should render a collapsible row',
      async (El, expected) => {
        const el = global.mount(
          <AuthContextProvider update="!*author">
            <Repeater
              {...genRepeaterProps()}
              renderNestedTableRow={El}
            >
              <div />
            </Repeater>
          </AuthContextProvider>,
        );

        await act(async () => {
          el.find(Item).first().props().toggleNested();
        });

        el.update();
        expect(el.find('.nested').first().exists()).toBe(
          expected,
        );
      },
    );
  });

  describe('searching', () => {
    it('should narrow results on search', () => {
      reducer.mockImplementation(() => [
        { filterBy: 0, sortBy: 0, input: 'One Fine Day' },
        jest.fn(),
      ]);

      const searchedData = global
        .mount(
          <AuthContextProvider>
            <Repeater {...genRepeaterProps()} data={data}>
              <div />
            </Repeater>
          </AuthContextProvider>,
        )
        .find(RepeaterTable)
        .prop('data');

      expect(searchedData[0]).toHaveProperty(
        'title',
        'One Fine Day',
      );
    });
  });
});
