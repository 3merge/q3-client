import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from 'q3-ui/lib/iconButton';
import { post } from 'axios';
import Upload from '../upload';

jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue(),
}));

describe('Upload', () => {
  it('should post file to axios', () => {
    global
      .shallow(
        <Upload
          icon={AddIcon}
          url="https://google.ca"
          fileType="text/html"
          name="html"
        />,
      )
      .find('input')
      .simulate('change', {
        target: {
          files: [new Blob()],
        },
      });

    expect(post).toHaveBeenCalledWith(
      'https://google.ca',
      expect.any(Object),
    );
  });

  it('should open hidden input', () => {
    const el = global.shallow(
      <Upload
        icon={AddIcon}
        url="https://google.ca"
        fileType="text/html"
        name="html"
      />,
    );

    const btn = el.find(IconButton);
    const { inputRef, buttonProps } = btn.props();
    const click = jest.fn();
    inputRef.current = { click };
    buttonProps.onClick();
    expect(click).toHaveBeenCalled();
  });
});
