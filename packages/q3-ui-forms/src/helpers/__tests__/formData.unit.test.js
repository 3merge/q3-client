import formData from '../formData';

describe('formData', () => {
  it('should overwrite attachment names', (done) => {
    const foo = new Blob();

    foo.name = 'sample.csv';
    foo.$locals = {
      folder: 'parent',
    };

    const handler = jest.fn().mockImplementation((data) => {
      expect(data.get('parent/sample.csv')).toHaveProperty(
        'name',
        'sample.csv',
      );

      done();
    });

    formData(handler)(null, {
      foo,
    });
  });

  it('should add values', (done) => {
    const handler = jest.fn().mockImplementation((data) => {
      expect(data.get('foo')).toMatch('1');
      done();
    });

    formData(handler)({
      foo: 1,
    });
  });

  it('should preserve arrays', (done) => {
    const handler = jest.fn().mockImplementation((data) => {
      expect(data.get('foo.bar')).toMatch('1');
      expect(data.get('quuz.0.name')).toMatch('uno');
      expect(data.get('quuz.1.name')).toMatch('duo');
      done();
    });

    formData(handler)({
      foo: {
        bar: 1,
      },
      quuz: [{ name: 'uno' }, { name: 'duo' }],
    });
  });
});
