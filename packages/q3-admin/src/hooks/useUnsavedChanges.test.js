import {
  hasTarget,
  eventHandlerAdapter,
  includesNavigationElement,
} from './useUnsavedChanges';

jest.mock('q3-ui-helpers', () => ({
  browser: {
    proxySessionStorageApi: jest
      .fn()
      .mockReturnValue('true'),
  },
}));

test.each([
  [undefined, false],
  [{}, false],
  [{ target: 1, path: [1] }, true],
  [{ target: 1, path: [] }, false],
])('.hasTarget(%o)', (a, expected) => {
  expect(hasTarget(a)).toBe(expected);
});

test.each([
  [
    { getAttribute: jest.fn().mockReturnValue('tab') },
    true,
  ],
  [
    { getAttribute: jest.fn().mockReturnValue(undefined) },
    false,
  ],
  [{ tagName: 'A' }, true],
  [{}, false],
])('.includesNavigationElement(%o)', (a, expected) => {
  expect(includesNavigationElement(a)).toBe(expected);
});

test('eventHandlerAdapter', () => {
  const context = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  const params = ['click', expect.any(Function), true];

  const eh = eventHandlerAdapter(
    context,
    params[0],
    jest.fn(),
    { useCapture: true },
  );

  eh.add();
  eh.remove();

  expect(context.addEventListener).toHaveBeenCalledWith(
    ...params,
  );

  expect(context.addEventListener).toHaveBeenCalledWith(
    ...params,
  );
});
