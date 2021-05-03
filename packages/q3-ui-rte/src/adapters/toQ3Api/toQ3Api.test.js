import axios from 'axios';
import toQ3Api from './toQ3Api';

const url = 'htttps://images.google.ca';
const fn = toQ3Api('/foo');

beforeAll(() => {
  jest.spyOn(axios, 'post').mockResolvedValue({
    data: {
      uploads: [
        {
          url,
        },
      ],
    },
  });
});

describe('toQ3Api', () => {
  it('should reject without a file', () =>
    expect(fn()).rejects.toThrowError('no file'));

  it('should return URL', () =>
    expect(fn({ src: { file: 1 } })).resolves.toMatch(url));
});
