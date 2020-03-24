import React from 'react';
import Add from './add';
import CreateDialog from './dialog';

jest.spyOn(React, 'useContext').mockReturnValue({
  collectionName: 'demo',
  post: jest.fn(),
});

describe('Add', () => {
  it('should block Dialog from rendering without children', () => {
    const el = global.shallow(<Add title="foo" />);
    expect(el.find(CreateDialog)).toHaveLength(0);
  });
});
