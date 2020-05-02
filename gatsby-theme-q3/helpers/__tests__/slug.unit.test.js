const slug = require('../slug');

describe('slug', () => {
  it('should combine use slug attribute', () => {
    expect(
      slug({ slug: 'already-formatted-as-slug' }),
    ).toMatch('/already-formatted-as-slug');
  });

  it('should combine use title attribute', () => {
    expect(
      slug({ title: 'This is a post' }, 'foos'),
    ).toMatch('/foos/this-is-a-post');
  });

  it('should combine use name attribute', () => {
    expect(slug({ name: "Post's name" }, '/foos')).toMatch(
      '/foos/posts-name',
    );
  });
});
