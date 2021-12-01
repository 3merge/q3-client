import { spyOnReactHooks } from 'q3-ui-test-utils/lib';
import useQueues from './useQueues';

const srh = spyOnReactHooks();

jest.mock('q3-ui-helpers', () => ({
  string: {
    toDate: jest.fn().mockReturnValue('date'),
  },
}));

jest.mock('q3-ui-rest', () => {
  const d = new Date().toISOString();
  return () => ({
    queues: [
      {
        id: 1,
        completionDate: d,
        expectedCompletionDate: d,
        name: 'foo',
        message: 'bar',
        duration: 10,
        status: 'Done',
      },
      {
        id: 2,
        completionDate: d,
        expectedCompletionDate: d,
        name: 'quuz',
        status: 'Scheduled',
      },
    ],
  });
});

beforeAll(() => {
  srh.useMemo();
});

describe('useQueues', () => {
  it('should group/format data', () => {
    srh.useState('');
    const { past, upcoming } = useQueues({
      test: true,
    });

    expect(past[0]).toMatchObject({
      id: 1,
      completionDate: 'date',
      expectedCompletionDate: 'date',
      name: 'foo - bar',
      duration: '10s',
      status: 'Done',
      test: true,
    });

    expect(upcoming[0]).toMatchObject({
      id: 2,
      completionDate: 'date',
      expectedCompletionDate: 'date',
      name: 'quuz',
      duration: undefined,
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
});
