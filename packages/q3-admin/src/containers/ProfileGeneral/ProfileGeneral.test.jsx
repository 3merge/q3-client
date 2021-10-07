import { generateInitialValues } from './ProfileGeneral';

describe('generateInitialValues', () => {
  it('should return empty props', () => {
    expect(generateInitialValues({})).toMatchObject({
      email: '',
      firstName: '',
      lastName: '',
    });
  });

  it('should select from state', () => {
    expect(
      generateInitialValues(
        {
          email: 'foo@bar.com',
          age: 21,
        },
        ['age'],
      ),
    ).toMatchObject({
      email: 'foo@bar.com',
      age: 21,
    });
  });
});
