import formData from '../formData';

describe('formData', () => {
  it('should overwrite attachment names', (done) => {
    const foo = new Blob();

    foo.name = 'sample.csv';
    foo.$locals = {
      relativePath: 'parent',
      saveAs: 'child',
    };

    const handler = jest.fn().mockImplementation((data) => {
      expect(data.get('parent/child.csv')).toHaveProperty(
        'name',
        'child.csv',
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
      expect(JSON.parse(data.get('quuz'))).toHaveLength(2);
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
