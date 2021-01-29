import saveAs from 'file-saver';
import useSaveAs from './useSaveAs';

jest.mock('file-saver');

jest.mock('q3-exports', () => {
  return class Exports {
    // eslint-disable-next-line
    toBuffer() {
      return Promise.resolve({
        foo: 1,
      });
    }
  };
});

describe('useSaveAs', () => {
  it('should call saveAs with joined title', async () => {
    await useSaveAs('Sample Title').csv();
    expect(saveAs).toHaveBeenCalledWith(
      expect.any(Object),
      'sample-title.csv',
    );
  });
});
