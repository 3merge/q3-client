import {
  getAltAttribute,
  setAltAttribute,
} from './ImageAltTag';

test('getAltAttribute should call DOM attribute method', () => {
  const out = getAltAttribute({
    getAttribute: jest.fn().mockImplementation((v) => {
      expect(v).toMatch('alt');
      return 'testing';
    }),
  });

  expect(out).toMatch('testing');
});

test('setAltAttribute should curry DOM attribute method', () => {
  const next = jest.fn();
  const setAttribute = jest.fn();

  setAltAttribute(
    { setAttribute },
    'testing',
    next,
  )({
    preventDefault: jest.fn(),
  });

  expect(setAttribute).toHaveBeenCalledWith(
    'alt',
    'testing',
  );

  expect(next).toHaveBeenCalled();
});
