import { getAuthor } from '..';

describe('"getAuthor"', () => {
  it('should return null', () => {
    expect(getAuthor()).toBeNull();
  });

  it('should return full name', () => {
    expect(
      getAuthor({
        createdBy: { firstName: 'Joe', lastName: 'Doe' },
      }),
    ).toMatch('Joe Doe');
  });

  it('should return author prop', () => {
    expect(
      getAuthor({
        author: 'Sys',
      }),
    ).toMatch('Sys');
  });
});
