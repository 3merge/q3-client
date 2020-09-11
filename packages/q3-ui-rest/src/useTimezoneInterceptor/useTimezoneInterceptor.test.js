import {
  serializeDateFromUtcToLocalTime,
  convertUtcDateStringsToLocalTime,
} from './useTimezoneInterceptor';

jest.mock('q3-ui-helpers', () => ({
  browser: {
    proxyLocalStorageApi: jest
      .fn()
      // this is the underlying call in timezone.js
      // ultimately, this is more of an integration test
      .mockReturnValue('Australia/Sydney'),
  },
}));

describe('Rest config', () => {
  describe('"serializeDateFromUtcToLocalTime"', () => {
    it('should serialize date in UTC time', () => {
      const data = serializeDateFromUtcToLocalTime().paramsSerializer(
        {
          createdAt: new Date('2017-11-04T14:50:21-04:00'),
        },
      );

      expect(data).toMatch(
        'createdAt=2017-11-04T18%3A50%3A21.000Z',
      );
    });
  });

  describe('"convertUtcDateStringsToLocalTime"', () => {
    it('should convert date back to local time', async () => {
      const { data } = convertUtcDateStringsToLocalTime({
        data: {
          created: '2017-11-04T18:50:21.651Z',
        },
      });

      // should contain Austrlian offset from GMT
      expect(data.created).toMatch('+11:00');
    });
  });
});
