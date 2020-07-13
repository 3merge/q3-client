import useTitle from './useTitle';

const mockState = {
  foo: 1,
  bar: 2,
};

describe('Admin>useTitle', () => {
  it('should return the resourceName value by default', () =>
    expect(
      useTitle(
        {},
        {
          resourceName: 'foo',
        },
      ),
    ).toHaveProperty('title', 'foo'));

  it('should return state values', () => {
    const v = useTitle(mockState, {
      titleProp: 'foo',
      subtitleProp: 'bar',
    });

    expect(v).toHaveProperty('title', '1');
    expect(v).toHaveProperty('subtitle', '2');
  });

  it('should override props', () => {
    const titleRenderer = jest.fn();
    useTitle(mockState, {
      titleRenderer,
    });

    expect(titleRenderer).toHaveBeenCalledWith(mockState);
  });
});
