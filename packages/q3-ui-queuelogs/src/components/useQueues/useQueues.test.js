import { spyOnReactHooks } from 'q3-ui-test-utils/lib';
import useQueues, { getAverageDuration } from './useQueues';

const srh = spyOnReactHooks();

jest.mock('q3-ui-rest', () => () => ({
  queues: [
    {
      id: 1,
      name: 'foo',
      message: 'bar',
      status: 'Done',
    },
    {
      id: 2,
      name: 'quuz',
      status: 'Scheduled',
    },
  ],
}));

beforeAll(() => {
  srh.useCallback();
});

describe('useQueues', () => {
  it('should group/format data', () => {
    srh.useState('');
    const { past, upcoming } = useQueues({
      test: true,
    });

    expect(past[0]).toMatchObject({
      id: 1,
      name: 'foo - bar',
      status: 'Done',
      test: true,
    });

    expect(upcoming[0]).toMatchObject({
      id: 2,
      name: 'quuz',
      status: 'Scheduled',
      test: true,
    });
  });

  it('should filter data', () => {
    srh.useState('f');
    const { past, upcoming } = useQueues();
    expect(past).toHaveLength(1);
    expect(upcoming).toHaveLength(0);
  });

  describe('getAverageDuration', () => {
    it('should filter and sum DONE durations', () => {
      expect(
        getAverageDuration([
          {
            status: 'Done',
            duration: 0,
          },
          {
            status: 'Failed',
            duration: 0,
          },
          {
            status: 'Done',
            duration: 3,
          },
          {
            status: 'Done',
            duration: 5,
          },
          {
            status: 'Failed',
            duration: 0,
          },
          {
            status: 'Done',
            duration: 2,
          },
        ]),
      ).toBe(2.5);
    });
  });
});
