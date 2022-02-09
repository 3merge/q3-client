import {
  generateMetaDescriptionOptions,
  getStartUrl,
  generateIcons,
  generateBrand,
} from '../SearchEngine';

jest.mock('q3-ui-locale', () => ({
  browser: {
    isBrowserReady: jest.fn(),
  },
}));

const host = 'https://google.ca';

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      host,
    },
  });
});

describe('SearchEngine', () => {
  it('should not render descriptions without content', () => {
    expect(generateMetaDescriptionOptions().length).toBe(0);
  });

  it('should render descriptions with content', () => {
    expect(
      generateMetaDescriptionOptions('foo').length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('should return host', () => {
    expect(getStartUrl()).toMatch(host);
  });

  it('should render favicon', () => {
    expect(
      generateIcons({
        favicon: host,
      }),
    ).toHaveLength(1);
  });

  it('should not render favicon', () => {
    expect(
      generateIcons({
        favicon: undefined,
      }),
    ).toHaveLength(0);
  });

  it('should include template literals', () => {
    expect(generateBrand('3merge')).toMatch('%s | 3merge');
  });
});
