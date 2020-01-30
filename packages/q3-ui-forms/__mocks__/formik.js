export const useField = jest
  .fn()
  .mockReturnValue([
    { name: 'foo', value: 'bar' },
    { error: 'noop' },
  ]);

export const getIn = jest.fn().mockReturnValue('');

export const useFormikContext = jest.fn().mockReturnValue({
  setFieldValue: jest.fn(),
  submitForm: jest.fn(),
  values: {},
  errors: {},
});

export const connect = jest.fn();

export default jest.fn().mockReturnValue({
  onStart: jest.fn(),
  onComplete: jest.fn(),
  connect: jest.fn(),
});
