import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import mock from '../__mocks__/contentful';
import { renderRichText } from '../RichText';

let mount;
let wrapper;

beforeAll(() => {
  mount = createMount();
  // eslint-disable-next-line
  wrapper = mount(<div>{renderRichText(mock.json)}</div>);
});

afterAll(() => {
  mount.cleanUp();
});

test.each([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'img',
  'li',
  'a',
  'strong',
  'i',
  'u',
  'hr',
])('Rich text rendering of <(%s) />', (a) =>
  expect(wrapper.find(a).length).toBeGreaterThanOrEqual(1),
);
