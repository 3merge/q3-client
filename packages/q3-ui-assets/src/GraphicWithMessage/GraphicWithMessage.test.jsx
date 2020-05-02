import React from 'react';
import GraphicWithMessage from './GraphicWithMessage';

describe('GraphicWithMessage', () => {
  it('should invoke top and bottom renderers', () => {
    const renderTop = jest.fn();
    const renderBottom = jest.fn();

    global.shallow(
      <GraphicWithMessage
        icon="Add"
        title="lorem"
        renderTop={renderTop}
        renderBottom={renderBottom}
      />,
    );

    expect(renderTop).toHaveBeenCalled();
    expect(renderBottom).toHaveBeenCalled();
  });

  it('should load a description', () => {
    const text = global
      .mount(
        <GraphicWithMessage
          icon="Add"
          title="lorem"
          description="custom"
        />,
      )
      .find('p')
      .text();

    expect(text).toMatch('custom');
  });

  it('should use title for description', () => {
    const text = global
      .mount(
        <GraphicWithMessage icon="Add" title="lorem" />,
      )
      .find('p')
      .text();

    expect(text).toMatch('lorem');
  });
});
