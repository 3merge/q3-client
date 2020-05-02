import config from '../gatsby-config';

const CANONICAL = 'gatsby-plugin-canonical-urls';
const MANIFEST = 'gatsby-plugin-manifest';

const ENV = {
  contentfulSpaceID: 1,
  contentfulAccessToken: 1,
};

const containsResolver = (plugins = [], name) =>
  plugins.find(
    (p) => typeof p === 'object' && p.resolve === name,
  );

const checkPlugins = (args = {}, plugin) => {
  const { plugins } = config({ ...ENV, ...args });
  const statement = expect(
    containsResolver(plugins, plugin),
  );

  return {
    has: () => statement.not.toBeUndefined(),
    hasNot: () => statement.toBeUndefined(),
  };
};

describe('gatsby-config', () => {
  describe('plugins', () => {
    it('should error without contentful props', () =>
      expect(() => config({})).toThrowError());

    it('should include conditional plugins', () =>
      [CANONICAL, MANIFEST].forEach((name) =>
        checkPlugins(
          {
            brandingColor: '#FFF',
            title: 'Foo',
            siteUrl: 'https://google.ca',
          },
          name,
        ).has(),
      ));

    it('should exclude conditional plugins', () =>
      [CANONICAL, MANIFEST].forEach((name) =>
        checkPlugins({}, name).hasNot(),
      ));
  });
});
