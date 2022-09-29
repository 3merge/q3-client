import useEscape from './useEscape';

const defineActiveElement = (value) => {
  Object.defineProperty(document, 'activeElement', {
    value,
    writable: true,
  });
};

const defineQuerySelector = (value) =>
  jest
    .spyOn(document, 'querySelectorAll')
    .mockReturnValue(value);

const generateFocasableNode = () => {
  const focus = jest.fn();
  const node = {
    focus,
    querySelector: jest.fn().mockReturnValue({
      focus,
    }),
  };

  return node;
};

describe('useEscape', () => {
  describe('onFocus', () => {
    it('should focus when active element and current target match', () => {
      const node = generateFocasableNode();
      defineActiveElement(node);
      useEscape().onFocus({ currentTarget: node });
      expect(node.focus).toHaveBeenCalled();
    });

    it('should not focus when active element and current target do not match', () => {
      const node = generateFocasableNode();
      defineActiveElement({ foo: 1 });
      useEscape().onFocus({ currentTarget: node });
      expect(node.focus).not.toHaveBeenCalled();
    });
  });

  describe('onKeyDown', () => {
    it('should skip negative tab index and hidden elements', () => {
      const nodes = [
        { id: 1, focus: jest.fn(), tabIndex: '1' },
        { id: 2, focus: jest.fn(), tabIndex: '1' },
        { id: 3, focus: jest.fn(), tabIndex: '-1' },
        {
          id: 4,
          focus: jest.fn(),
          tabIndex: '1',
          style: {
            cssText: 'display: none;',
          },
        },
        { id: 5, focus: jest.fn(), tabIndex: '1' },
      ];

      useEscape().onKeyDown({
        code: 'ArrowRight',
        currentTarget: {
          querySelector: jest.fn().mockReturnValue({
            contains: jest.fn().mockReturnValue(true),
            querySelectorAll: jest
              .fn()
              .mockReturnValue(nodes),
          }),
        },

        target: nodes[1],
        preventDefault: jest.fn(),
      });

      expect(nodes[4].focus).toHaveBeenCalled();
    });

    it('should return to start of list', () => {
      const nodes = [
        { id: 1, focus: jest.fn(), tabIndex: '1' },
        { id: 2, focus: jest.fn(), tabIndex: '1' },
        { id: 3, focus: jest.fn(), tabIndex: '1' },
      ];

      useEscape().onKeyDown({
        code: 'ArrowLeft',
        currentTarget: {
          querySelector: jest.fn().mockReturnValue({
            contains: jest.fn().mockReturnValue(true),
            querySelectorAll: jest
              .fn()
              .mockReturnValue(nodes),
          }),
        },

        target: nodes[1],
        preventDefault: jest.fn(),
      });

      expect(nodes[0].focus).toHaveBeenCalled();
    });

    it('should focus editor', () => {
      const node = generateFocasableNode();
      node.querySelector = jest.fn().mockReturnValue({
        contains: jest.fn().mockReturnValue(true),
      });

      useEscape().onKeyDown({
        code: 'Tab',
        currentTarget: node,
        target: {},
        preventDefault: jest.fn(),
      });

      expect(node.focus).toHaveBeenCalled();
    });

    it('should focus first toolbar button', () => {
      const node = generateFocasableNode();
      const focus = jest.fn();

      node.querySelector = jest.fn().mockReturnValue({
        focus,
      });

      useEscape().onKeyDown({
        code: 'F10',
        altKey: true,
        currentTarget: node,
        target: {},
        preventDefault: jest.fn(),
      });

      expect(focus).toHaveBeenCalled();
    });

    it('should focus previous element', () => {
      const nodes = [
        {
          id: 1,
          focus: jest.fn(),
          tabIndex: '1',
        },
        {
          id: 2,
          focus: jest.fn(),
          tabIndex: '1',
        },
        {
          id: 3,
          focus: jest.fn(),
          tabIndex: '1',
        },
      ];

      nodes[1].querySelector = jest.fn();
      nodes[1].contains = jest.fn().mockReturnValue(false);
      defineQuerySelector(nodes);

      useEscape().onKeyDown({
        code: 'Tab',
        shiftKey: true,
        currentTarget: nodes[1],
        target: {},
        preventDefault: jest.fn(),
      });

      expect(nodes[0].focus).toHaveBeenCalled();
    });

    it('should focus next element', () => {
      const nodes = [
        {
          id: 1,
          focus: jest.fn(),
          tabIndex: '1',
        },
        {
          id: 2,
          focus: jest.fn(),
          tabIndex: '1',
        },
        {
          id: 3,
          focus: jest.fn(),
          tabIndex: '1',
        },
      ];

      nodes[1].querySelector = jest.fn();
      nodes[1].contains = jest.fn().mockReturnValue(false);
      defineQuerySelector(nodes);

      useEscape().onKeyDown({
        code: 'Escape',
        currentTarget: nodes[1],
        target: {},
        preventDefault: jest.fn(),
      });

      expect(nodes[2].focus).toHaveBeenCalled();
    });
  });
});
