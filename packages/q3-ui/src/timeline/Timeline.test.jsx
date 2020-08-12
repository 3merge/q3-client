import { formatUser } from './Timeline';

const execFormatUser = (stub, expectedOutput) =>
  expect(formatUser(stub)).toEqual(expectedOutput);

describe('Timeline', () => {
  describe('"formatUser"', () => {
    it('should display full name', () =>
      execFormatUser(
        {
          firstName: 'Jon',
          lastName: 'Doe',
        },
        'Jon Doe',
      ));

    it('should display first name', () =>
      execFormatUser(
        {
          firstName: 'Jon',
        },
        'Jon',
      ));

    it('should display last name', () =>
      execFormatUser(
        {
          lastName: 'Doe',
        },
        'Doe',
      ));

    it('should display no name', () =>
      execFormatUser({}, null));
  });
});
