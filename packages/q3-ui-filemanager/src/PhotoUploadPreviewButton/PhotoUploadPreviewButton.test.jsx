import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PhotoUploadPreviewButton from './PhotoUploadPreviewButton';

jest.mock('./styles', () => () => ({}));

const checkMenuItemDisabledProp = (props) => {
  const items = global
    .shallow(<PhotoUploadPreviewButton {...props} />)
    .find(MenuItem);

  return (index, expectedValue) =>
    expect(items.at(index).prop('disabled')).toEqual(
      expectedValue,
    );
};

describe('PhotoUploadPreviewButton', () => {
  it('should enable actions', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      canCreate: true,
      canEdit: true,
      canDelete: true,
    });

    const assert = checkMenuItemDisabledProp({
      src: 'http',
    });

    assert(1, false);
    assert(2, false);
  });

  it('should disable actions', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      canCreate: false,
      canEdit: true,
      canDelete: false,
    });

    const assert = checkMenuItemDisabledProp({
      src: 'http',
    });

    assert(1, true);
    assert(2, true);
  });

  it('should disable clear without src', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      canCreate: true,
      canEdit: true,
      canDelete: true,
    });

    const assert = checkMenuItemDisabledProp({});
    assert(2, true);
  });
});
