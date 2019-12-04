import { getContentFromProps, getSteps } from '.';

describe('Wizard', () => {
  describe('getContentFromProps', () => {
    it('should return single string', () =>
      expect(
        getContentFromProps({ getContent: 'foo' }),
      ).toMatch('foo'));

    it('should return from index in array', () =>
      expect(
        getContentFromProps({
          getContent: ['foo', 'bar'],
          position: 1,
        }),
      ).toMatch('bar'));
  });

  describe('getSteps', () => {
    it('should return empty array', () =>
      expect(getSteps({ steps: undefined })).toEqual([]));

    it('should return an array', () =>
      expect(getSteps({ steps: 'foo' })).toEqual(['foo']));

    it('should return itself', () =>
      expect(getSteps({ steps: ['foo'] })).toEqual([
        'foo',
      ]));
  });
});
