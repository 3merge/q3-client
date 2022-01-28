import useTitle from './useTitle';

const mockState = {
  foo: 1,
  bar: 2,
};

describe('useTitle', () => {
  it('should return state values', () => {
    const v = useTitle(mockState, {
      titleProp: 'foo',
    });

    expect(v).toEqual('1');
  });

  it('should add parentheses', () => {
    const v = useTitle(mockState, {
      titleProp: 'foo',
      parenthesesProp: 'bar',
    });

    expect(v).toEqual('1 (2)');
  });

  it('should override props', () => {
    const titleRenderer = jest.fn();
    useTitle(mockState, {
      titleRenderer,
    });

    expect(titleRenderer).toHaveBeenCalledWith(mockState);
  });
});
