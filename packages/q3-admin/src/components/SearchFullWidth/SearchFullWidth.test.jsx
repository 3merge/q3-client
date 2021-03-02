import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SearchFullWidth from './SearchFullWidth';

test('should not render close button', () => {
  const el = global
    .mount(
      <SearchFullWidth value="" handleReset={jest.fn()} />,
    )
    .find(SearchIcon);
  expect(el.isEmptyRender()).toBeFalsy();
});

test('should render close button', () => {
  const el = global
    .mount(
      <SearchFullWidth
        value="foo"
        handleReset={jest.fn()}
      />,
    )
    .find(SearchIcon);
  expect(el.exists()).toBeTruthy();
});
