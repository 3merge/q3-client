import useDragHandlerPreview from './useDragHandlerPreview';

jest.mock('react-dnd', () => ({
  useDragDropManager: jest.fn().mockReturnValue({
    getMonitor: jest.fn().mockReturnValue({
      didDrop: jest.fn().mockReturnValue(false),
      isDragging: jest.fn().mockReturnValue(true),
      getClientOffset: jest.fn().mockReturnValue({
        x: 95,
        y: 85,
      }),
      subscribeToOffsetChange: jest
        .fn()
        .mockImplementation((fn) => fn()),
    }),
  }),
}));

describe('useDragHandlerPreview', () => {
  it('should map monitor offset to pixels', () => {
    const element = {
      getAtribute: jest.fn(),
      setAttribute: jest.fn(),
      style: {},
    };

    useDragHandlerPreview()(element);
    expect(element.setAttribute).toHaveBeenCalledWith(
      'data-dragging',
      true,
    );

    expect(element.style).toMatchObject({
      left: '100px',
      top: '90px',
    });
  });
});
