import moment from 'moment';
import {
  serializeDateFromUtcToLocalTime,
  convertUtcDateStringsToLocalTime,
} from './useTimezoneInterceptor';

describe('Rest config', () => {
  describe('"serializeDateFromUtcToLocalTime"', () => {
    it('should', () => {
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
    it('should convert date', async () => {
      const { data } = convertUtcDateStringsToLocalTime({
        data: {
          created: '2017-11-04T18:50:21.651Z',
        },
      });

      expect(
        moment(data.created).format(
          'YYYY-MM-DD, h:mm:ss a',
        ),
      ).toEqual('2017-11-04, 2:50:21 pm');
    });
  });
});
