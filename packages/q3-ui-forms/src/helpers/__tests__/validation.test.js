import '../validation';
import * as yup from 'yup';

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

    it('it should return true if empty and not required', (done) => {
      yup
        .object()
        .shape({
          autocomplete: yup.mixed().autocomplete(),
        })
        .isValid({ autocomplete: '' })
        .then((valid) => {
          expect(valid).toBeTruthy();
          done();
        });
    });

    it('it should return true if undefined and not required', (done) => {
      yup
        .object()
        .shape({
          autocomplete: yup.mixed().autocomplete(),
        })
        .isValid({ autocomplete: undefined })
        .then((valid) => {
          expect(valid).toBeTruthy();
          done();
        });
    });
  });

  describe('Tel value object', () => {
    const schema = yup.object().shape({
      tel: yup
        .string()
        .tel()
        .required(),
    });

    it('it should return false', (done) => {
      schema.isValid({ tel: '093249' }).then((valid) => {
        expect(valid).toBeFalsy();
        done();
      });
    });

    it('it should return true', (done) => {
      schema
        .isValid({ tel: '9053214455' })
        .then((valid) => {
          expect(valid).toBeTruthy();
          done();
        });
    });

    it('it should return true', (done) => {
      schema
        .isValid({ tel: '905-321-4455' })
        .then((valid) => {
          expect(valid).toBeTruthy();
          done();
        });
    });

    it('it should return true', (done) => {
      schema
        .isValid({ tel: '(905) 321-4455' })
        .then((valid) => {
          expect(valid).toBeTruthy();
          done();
        });
    });
  });
});
