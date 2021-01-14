import React from 'react';
import AuthContextProvider from '../fixtures/AuthContextProvider';
import { genRepeaterProps } from '../helpers';
import Repeater from '../../src';
import {
  AddItem,
  Search,
  SelectForm,
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

it.todo('should hide search');

it('should show search', () => {
  const wrapper = render();
  expect(wrapper.find(Search).exists()).toBeTruthy();
});

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

it.todo('should show multi-select');
it.todo('should hide multi-select');
