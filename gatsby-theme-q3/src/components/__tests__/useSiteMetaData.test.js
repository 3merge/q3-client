import useSiteMetaData from '../useSiteMetaData';

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  useStaticQuery: jest.fn(),
}));

jest.mock(
  'gatsby-theme-q3-mui/src/components/useRunTime',
  () =>
    jest.fn().mockReturnValue({
      foo: 1,
      bar: null,
      quuz: 'string',
      thunk: undefined,
    }),
);

describe('useSiteMetaData', () => {
  it('should overwrite only the nullish and undefined', () => {
    expect(
      useSiteMetaData({
        foo: 2,
        bar: 2,
        quuz: 2,
        thunk: 2,
      }),
    ).toEqual({
      foo: 1,
      bar: 2,
      quuz: 'string',
      thunk: 2,
    });
  });

  it('should return without defaults', () => {
    expect(useSiteMetaData()).toEqual({
      foo: 1,
      bar: null,
      quuz: 'string',
      thunk: undefined,
    });
  });
});
