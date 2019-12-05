import * as yup from 'yup';
import parseFields from '..';

test('Field parser should assemble a schema map', () =>
  expect(
    JSON.stringify(
      parseFields({
        firstName: {
          type: 'text',
          required: true,
          ensure: true,
          trim: true,
        },
        age: {
          type: 'number',
          min: 2,
          max: 100,
        },
        check: {
          type: 'checkbox',
        },
        select: {
          type: 'select',
        },
      }),
    ) ===
      JSON.stringify(
        yup.object().shape({
          firstName: yup
            .string()
            .required()
            .ensure()
            .trim(),
          age: yup
            .number()
            .min(2)
            .max(100),
          check: yup.boolean(),
          select: yup.mixed().autocomplete(),
        }),
      ),
  ).toBeTruthy());

describe('Custom validators', () => {
  describe('Postal code', () => {
    const schema = yup.object().shape({
      postal: yup
        .string()
        .postal()
        .required(),
    });

    it('it should return false', (done) => {
      schema.isValid({ postal: 'LLL' }).then((valid) => {
        expect(valid).toBeFalsy();
        done();
      });
    });

    it('it should return true', (done) => {
      schema.isValid({ postal: 'L1S7E8' }).then((valid) => {
        expect(valid).toBeTruthy();
        done();
      });
    });

    it('it should return true', (done) => {
      schema
        .isValid({ postal: 'L1s 7e8' })
        .then((valid) => {
          expect(valid).toBeTruthy();
          done();
        });
    });

    it('it should return true', (done) => {
      schema.isValid({ postal: '90210' }).then((valid) => {
        expect(valid).toBeTruthy();
        done();
      });
    });
  });

  describe('Autocomplete value object', () => {
    const schema = yup.object().shape({
      autocomplete: yup
        .mixed()
        .autocomplete()
        .required(),
    });

    it('it should return false', (done) => {
      schema
        .isValid({ autocomplete: 'LLL' })
        .then((valid) => {
          expect(valid).toBeFalsy();
          done();
        });
    });

    it('it should return true', (done) => {
      schema
        .isValid({ autocomplete: { value: 'hey' } })
        .then((valid) => {
          expect(valid).toBeTruthy();
          done();
        });
    });
  });
});
