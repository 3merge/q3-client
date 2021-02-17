import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import Auth from './Auth';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    collectionName: 'Foo',
    name: 'Bar',
  });
});

describe('"Auth"', () => {
  it('should return null without children', () => {
    const el = global.shallow(<Auth op="Read" />);
    expect(el).toEqual({});
  });

  it('should return null without permissions', () => {
    useAuth.mockReturnValue({
      canSeeSub: jest.fn().mockReturnValue(false),
    });
    const el = global.shallow(
      <Auth op="Read">
        <div />
      </Auth>,
    );

    expect(el).toEqual({});
  });

  it('should forward props to children', () => {
    const clone = jest.spyOn(React, 'cloneElement');

    useAuth.mockReturnValue({
      canSeeSub: jest.fn().mockReturnValue(true),
    });

    global.shallow(
      <Auth op="Read">
        <div />
      </Auth>,
    );

    expect(clone).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        collectionName: expect.any(String),
        name: expect.any(String),
      }),
    );
  });
});
