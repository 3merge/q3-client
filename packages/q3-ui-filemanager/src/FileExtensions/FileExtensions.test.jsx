import React from 'react';
import Image from '@material-ui/icons/Image';
import { orange } from '@material-ui/core/colors';
import FileExtensions from './FileExtensions';

describe('FileExtensions', () => {
  it('should render ImageIcon', () => {
    const el = global.shallow(
      <div>{FileExtensions('icon')('jpg')}</div>,
    );

    expect(el.find(Image)).toHaveLength(1);
  });

  it('should render color', () =>
    expect(FileExtensions('color')('file')).toMatch(
      orange[400],
    ));
});
