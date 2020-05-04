import React from 'react';
import Inline from './Inline';

jest.mock('useful-state', () => ({
  useToggle: jest.fn().mockReturnValue({
    open: jest.fn(),
    close: jest.fn(),
    state: true,
  }),
}));

describe('Inline', () => {
  it('should call renderers', () => {
    const renderContent = jest.fn();
    const renderTrigger = jest.fn();
    global.shallow(
      <Inline
        title="foo"
        renderTrigger={renderTrigger}
        renderContent={renderContent}
      />,
    );

    expect(renderContent).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(renderTrigger).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Boolean),
      expect.any(Object),
    );
  });
});
