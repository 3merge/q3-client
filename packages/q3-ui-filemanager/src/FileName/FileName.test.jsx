import React from 'react';
import FileName from './FileName';

describe('FileName', () => {
  it('should render link', async () => {
    const el = global.mount(
      <FileName name="foo" url="http://google.ca" />,
    );

    expect(el.find('a').props()).toHaveProperty('download');
  });

  it('should render button', async () => {
    const el = global.mount(
      <FileName onClick={jest.fn()} name="foo" />,
    );

    expect(el.find('button').props()).toHaveProperty(
      'onClick',
    );
  });
});
