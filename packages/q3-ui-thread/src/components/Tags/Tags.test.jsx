import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Tags from './Tags';

const checkText = (
  tags = [],
  expectedText = '',
  index = 0,
) =>
  expect(
    global
      .shallow(<Tags selectTag={jest.fn()} tags={tags} />)
      .find(ListItem)
      .at(index)
      .text(),
  ).toMatch(expectedText);

jest.mock('../useNoteTags', () => () => [
  'foo',
  'bar',
  'quuz',
]);

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    canTag: true,
  });
});

describe('Tags', () => {
  it('should render select all when only a few have been selected', () => {
    checkText(['foo', 'bar'], 'selectAll');
  });

  it('should skip select all when all have been selected', () => {
    checkText(['foo', 'bar', 'quuz'], 'clearTags');
  });

  it('should skip clear all when nothing has been selected', () => {
    checkText([], 'foo', 1);
  });

  it('should mark as selected', () => {
    const t = global
      .shallow(
        <Tags selectTag={jest.fn()} tags={['foo']} />,
      )
      .find(ListItem)
      .at(2)
      .props();

    expect(t).toMatchObject({
      selected: true,
    });
  });
});
