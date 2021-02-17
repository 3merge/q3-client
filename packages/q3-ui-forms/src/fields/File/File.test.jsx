import React from 'react';
import { get } from 'lodash';
import TextField from '@material-ui/core/TextField';
import { FileInput } from './File';

const testRendererDisplayName = (
  props,
  expectedDisplayName,
) => {
  const { InputProps } = global
    .shallow(<FileInput name="Test" {...props} />)
    .find(TextField)
    .props();

  expect(
    get(
      InputProps,
      'endAdornment.props.children.type.render.displayName',
    ),
  ).toMatch(expectedDisplayName);
};

describe('FileField', () => {
  it('should render <IconButton /> to clear value', () =>
    testRendererDisplayName(
      { value: 'foo.csv' },
      'IconButton',
    ));

  it.skip('should render icon to signify upload action', () =>
    testRendererDisplayName({ value: null }, 'Publish'));
});
