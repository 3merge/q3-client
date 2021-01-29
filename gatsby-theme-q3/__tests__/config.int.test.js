import { get } from 'lodash';
import config from '../gatsby-config';

const CANONICAL = 'gatsby-plugin-canonical-urls';
const MANIFEST = 'gatsby-plugin-manifest';
const ROBOTS = 'gatsby-plugin-robots-txt';

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
    it('should error without contentful props', () => {
      process.env.URL =
        'https://development.netlify.3merge.com';
      expect(() => config({})).toThrowError();
    });

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

    it.each([
      ['https://dev.netlify.3merge.com', 'disallow'],
      ['https://3merge.com', 'allow'],
    ])('should disable indexing', (url, key) => {
      process.env.URL = url;
      const { plugins } = config({ ...ENV });
      const res = containsResolver(plugins, ROBOTS);
      const prod = get(
        res,
        'options.env.production.policy',
      )[0];
      expect(prod).toHaveProperty(key, '/');
    });
  });
});
