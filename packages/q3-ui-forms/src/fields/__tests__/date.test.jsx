import { intercept } from '../date';

test('intercept should stub synthetic event object', () => {
  const fn = jest.fn();
  intercept(fn, 'Foo')(null, 'Bar');

  expect(fn).toHaveBeenCalledWith({
    target: {
      value: 'Bar',
      name: 'Foo',
    },
  });
});
