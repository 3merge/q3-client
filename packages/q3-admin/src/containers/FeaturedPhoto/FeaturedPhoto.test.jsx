import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import FeaturedPhoto, {
  FEATURED_UPLOAD_KEY,
} from './FeaturedPhoto';

describe('FeaturedPhoto', () => {
  it('should set FEATURED_UPLOAD_KEY to null', () => {
    const update = jest.fn();
    global
      .shallow(
        <FeaturedPhoto
          component={Avatar}
          update={update}
        />,
      )
      .find(Avatar)
      .props()
      .onDelete();

    expect(update).toHaveBeenCalledWith({
      [FEATURED_UPLOAD_KEY]: null,
    });
  });
});
