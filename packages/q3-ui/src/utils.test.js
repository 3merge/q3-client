import { getLinkAttributes } from './utils';

describe('getLinkAttributes', () => {
  it('should return @reach/router Link', () => {
    expect(getLinkAttributes('/')).toMatchObject({
      component: expect.any(Object),
      to: '/',
    });
  });

  it('should prepend forward slash on @reach/router Link', () => {
    expect(getLinkAttributes('demo')).toMatchObject({
      component: expect.any(Object),
      to: '/demo',
    });
  });

  it('should return with target attributes', () => {
    expect(
      getLinkAttributes('https://www.example.com'),
    ).toMatchObject({
      href: '//www.example.com',
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });
});
