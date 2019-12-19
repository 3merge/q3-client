import * as utils from '../utils';

describe('getPath', () => {
  it('should return empty on 0', () =>
    expect(utils.getPath(0, 'slug')).toMatch(''));

  it('should prefix with forward slash', () =>
    expect(utils.getPath('!', 'slug')).toMatch('/slug'));
});

describe('ellipsis', () => {
  it('should truncate text', () => {
    expect(
      utils.ellipsis(
        'THIS_IS_MORE_THAN_N_NUMBER_OF_CHARACTERS_SO_LETS_SHORTEN_IT',
      ),
    ).toMatch('...');
  });
});
