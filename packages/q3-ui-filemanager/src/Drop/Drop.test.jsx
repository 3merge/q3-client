import {
  AcceptedFileDecorator,
  handleFocusStateOnDrag,
} from './Drop';

jest.mock('q3-ui-helpers/lib/browser', () => ({
  isBrowserReady: jest.fn().mockReturnValue(true),
}));

const blur = jest.fn();
const focus = jest.fn();

const testFileName = (
  directory,
  initialValue,
  expectedValue,
) => {
  const afd = new AcceptedFileDecorator([
    { name: initialValue },
  ]);

  afd.directory = directory;
  expect(afd.data[0]).toHaveProperty(
    'relativePath',
    expectedValue,
  );
};

describe('Drop', () => {
  describe('"AcceptedFileDecorator"', () => {
    it('should add directory path to names', () =>
      testFileName('foo', 'bar.csv', 'foo/bar.csv'));

    it('should check file path before appending directory', () =>
      testFileName('', '/bar.csv', 'bar.csv'));

    it('should add error property', () => {
      const [{ error }] = new AcceptedFileDecorator([
        { name: 'foo.csv' },
      ]).withErrors();

      expect(error).toBeTruthy();
    });
  });

  describe('"handleFocusStateOnDrag"', () => {
    beforeAll(() => {
      jest
        .spyOn(document, 'getElementById')
        .mockReturnValue({
          blur,
          focus,
        });
    });

    it('should focus element', () => {
      handleFocusStateOnDrag(true);
      expect(focus).toHaveBeenCalled();
    });

    it('should blur element', () => {
      handleFocusStateOnDrag(false);
      expect(blur).toHaveBeenCalled();
    });
  });
});
