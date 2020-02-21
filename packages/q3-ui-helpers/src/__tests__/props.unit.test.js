import * as props from '../props';

describe('Props', () => {
  describe('"has"', () => {
    it('should return falsy without keys', () =>
      expect(props.has({ props: {} })).toBeFalsy());

    it('should return truthy', () =>
      expect(
        props.has({ props: { key: 1 } }),
      ).toBeTruthy());

    it('should return falsy', () =>
      expect(props.has()).toBeFalsy());
  });

  describe('"callOnChildren"', () => {
    it('should invoke on child property', () => {
      const fn = jest.fn();
      props.callOnChildren({ props: { children: 1 } }, fn);
      expect(fn).toHaveBeenCalledWith(1);
    });

    it('should invoke on child property', () => {
      const out = props.callOnChildren({
        props: { children: 1 },
      });
      expect(out).toBeUndefined();
    });
  });

  describe('"mapBy"', () => {
    it('should flatten child props', () => {
      expect(
        props.mapBy(
          [
            { props: { name: 'foo' } },
            { props: { name: 'bar' } },
          ],
          'name',
        ),
      ).toEqual(['foo', 'bar']);
    });
  });
});
