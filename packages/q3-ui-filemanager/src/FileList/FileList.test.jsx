import { makeDirectories } from './FileList';

describe('FileList', () => {
  it('should group by file directory', () => {
    const a = [
      'foo/bar.csv',
      'bar/baz/quuz.pdf',
      'thunk.doc',
    ].map((name) => ({
      name,
    }));

    expect(makeDirectories(a)).toEqual({
      foo: {
        default: [{ name: 'foo/bar.csv' }],
      },
      bar: {
        baz: {
          default: [{ name: 'bar/baz/quuz.pdf' }],
        },
      },
      default: [{ name: 'thunk.doc' }],
    });
  });
});
