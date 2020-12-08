import {
  getPath,
  removeFileExtension,
  makeDirectories,
} from '../src/useDir';
import files from './fixtures/files';

describe('FileList', () => {
  it('should run prop and append "default"', () => {
    expect(getPath('test/john/doe')).toBe(
      'test.john.default',
    );
  });

  it.each([['foo.pdf', 'foo'], ['foo', 'foo'], [false]])(
    'should return extension',
    (filename, extension = '') => {
      expect(removeFileExtension(filename)).toBe(extension);
    },
  );

  it('should group by file directory', () => {
    const f = makeDirectories(files);
    expect(f).toHaveProperty(
      'archives.2020.default',
      expect.any(Array),
    );

    expect(f).toHaveProperty(
      'pos.default',
      expect.any(Array),
    );
  });
});
