import React from 'react';
import Add, { CreateDialog } from './add';

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
