import 'yup';
import parseFields from '.';

const runValidation = (schema, inputs) => {
  try {
    return parseFields(schema)
      .isValid(inputs)
      .then((valid) => {
        if (!valid) throw new Error('Invalid!');
        return true;
      });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const isValid = (...args) =>
  expect(runValidation(...args)).resolves.toBeTruthy();

export const isInvalid = (...args) =>
  expect(runValidation(...args)).rejects.toThrowError();
