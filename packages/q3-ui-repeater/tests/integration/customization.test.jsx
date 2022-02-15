import React from 'react';
import data from '../fixtures/articles';
import AuthContextProvider from '../fixtures/AuthContextProvider';
import { genRepeaterProps } from '../helpers';
import Repeater from '../../src';
import { Search, ItemHeader } from '../../src/components';

jest.unmock('useful-state');

const render = (props = {}) =>
  global.mount(
    <AuthContextProvider>
      <Repeater {...genRepeaterProps()} {...props}>
        <div>children</div>
      </Repeater>
    </AuthContextProvider>,
  );

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
