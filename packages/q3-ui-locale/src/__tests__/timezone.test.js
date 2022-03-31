import { browser } from 'q3-ui-helpers';
import { toLocal, toUtc } from '../timezone';

const iso = '2022-03-31T21:53:29.000Z';
const local = '2022-04-01T08:53:29+11:00';

beforeAll(() => {
  jest
    .spyOn(browser, 'proxyLocalStorageApi')
    .mockReturnValue('Australia/Sydney');
});

describe('timezone', () => {
  it('should convert from UTC', () => {
    expect(toLocal(iso)).toMatch(local);
  });

  it('should convert to UTC', () => {
    expect(toUtc(local)).toMatch(iso);
  });
});
