import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import auth from 'q3-ui-permissions';
import FeaturedPhoto, {
  FEATURED_UPLOAD_KEY,
} from './FeaturedPhoto';

jest.mock('q3-ui-permissions', () => {
  const canEditSub = jest.fn();

  return {
    canEditSub,
    useAuth: jest.fn().mockReturnValue({
      canEditSub,
    }),
  };
});

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

  it('should modify form data', () => {
    const update = jest.fn();
    const f = new FormData();
    f.set('custom', new File([''], 'testing'));

    global
      .shallow(
        <FeaturedPhoto
          component={Avatar}
          update={update}
          field="custom"
        />,
      )
      .find(Avatar)
      .props()
      .onDrop(f);

    expect(update).toHaveBeenCalled();
    expect(f.get('custom')).toMatch('test');
    expect(f.get('uploads/testing').name).toMatch(
      'testing',
    );
  });

  it('should disable the component', () => {
    auth.canEditSub.mockReturnValue(false);

    expect(
      global
        .shallow(
          <FeaturedPhoto
            component={Avatar}
            field="custom"
            update={jest.fn()}
          />,
        )
        .find(Avatar)
        .props().disabled,
    ).toBeTruthy();
  });

  it('should enable the component', () => {
    auth.canEditSub.mockReturnValue(true);

    expect(
      global
        .shallow(
          <FeaturedPhoto
            component={Avatar}
            field="custom"
            update={jest.fn()}
          />,
        )
        .find(Avatar)
        .props().disabled,
    ).toBeFalsy();

    expect(auth.canEditSub).toHaveBeenLastCalledWith(
      'custom',
    );
  });
});
