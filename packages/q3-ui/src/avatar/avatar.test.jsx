import Avatar from '.';
import { materialShallow } from '../_helpers/testUtils';

describe('Avatar', () => {
  it('should parse the first letter', () => {
    expect(
      materialShallow(Avatar, {
        word: 'Mike',
      }).text(),
    ).toBe('M');
  });

  it('should respond empty without a word', () => {
    expect(materialShallow(Avatar, {})).toMatchObject({});
  });
});
