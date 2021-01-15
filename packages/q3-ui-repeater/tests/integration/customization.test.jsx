import React from 'react';
import data from '../fixtures/articles';
import AuthContextProvider from '../fixtures/AuthContextProvider';
import { genRepeaterProps } from '../helpers';
import Repeater from '../../src';
import {
  AddItem,
  Search,
  SelectForm,
  ItemHeader,
} from '../../src/components';

const sortOptions = [
  { label: 'seq' },
  { label: 'firstName' },
];

const filterOptions = [
  {
    label: 'SEQ 211',
    fn: (x) => Number(x.seq) === 211,
  },
  {
    label: 'Not SEQ 211',
    fn: (x) => Number(x.seq) !== 211,
  },
];

jest.unmock('useful-state');

const render = (props = {}) =>
  global.mount(
    <AuthContextProvider>
      <Repeater {...genRepeaterProps()} {...props}>
        <div>children</div>
      </Repeater>
    </AuthContextProvider>,
  );

/**
 * Test cases
 */

it.each([
  [true, false],
  [false, true],
])(
  'should conditionally render search',
  (disableSearch, expected) => {
    const wrapper = render({ disableSearch });
    expect(wrapper.find(Search).exists()).toBe(expected);
  },
);

it.each([
  [{}, true],
  [{ sortOptions }, false],
])(
  'should conditionally render sorting',
  (props, expected) => {
    const wrapper = render(props);

    const el = wrapper
      .find(SelectForm)
      .findWhere((x) => x.prop('label') === 'sortBy')
      .first()
      .isEmptyRender();

    expect(el).toBe(expected);
  },
);

it.each([
  [{}, true],
  [{ filterOptions }, false],
])(
  'should conditionally render sorting',
  (props, expected) => {
    const wrapper = render(props);

    const el = wrapper
      .find(SelectForm)
      .findWhere((x) => x.prop('label') === 'filterBy')
      .first()
      .isEmptyRender();

    expect(el).toBe(expected);
  },
);

it.each([
  [true, false],
  [false, true],
])(
  'should conditionally render create',
  (addDisabled, expected) => {
    const wrapper = render({ addDisabled });
    expect(wrapper.find(AddItem).exists()).toBe(expected);
  },
);

it('should replace create', () => {
  const Component = () => (
    <div id="customAdd">Custom add component</div>
  );
  const wrapper = render({ addComponent: <Component /> });
  expect(wrapper.find('#customAdd').exists()).toBeTruthy();
});

it.each([[true, false, false, true]])(
  'should show multi-select',
  (disableMultiselect, expected) => {
    const multiSelect = render({ data, disableMultiselect })
      .find(ItemHeader)
      .first()
      .prop('showMultiselect');

    expect(multiSelect).toBe(expected);
  },
);
