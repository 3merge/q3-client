import { makeDirectories } from './useDir';
import files from '../tests/fixtures/files';

describe('FileList', () => {
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
