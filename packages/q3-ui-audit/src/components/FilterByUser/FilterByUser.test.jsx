import { mapToName } from './FilterByUser';

describe('mapToName', () => {
  it('should return full name', () => {
    expect(
      mapToName([
        { id: 1, firstName: 'Jon', lastName: 'Snow' },
      ]),
    ).toEqual([
      expect.objectContaining({
        label: 'Jon Snow',
        value: 1,
      }),
    ]);
  });

  it('should return first name', () => {
    expect(
      mapToName([{ id: 1, firstName: 'Jon' }]),
    ).toEqual([
      expect.objectContaining({
        label: 'Jon',
        value: 1,
      }),
    ]);
  });

  it('should return email', () => {
    expect(
      mapToName([{ id: 1, email: 'test@gmail.com' }]),
    ).toEqual([
      expect.objectContaining({
        label: 'test@gmail.com',
        value: 1,
      }),
    ]);
  });
});
