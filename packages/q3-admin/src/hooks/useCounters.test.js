import {
  useStateMock,
  useEffectMock,
  useContextMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import axios from 'axios';
import { wait } from 'q3-ui-test-utils/lib/enzymeUtils';
import useCounters from './useCounters';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const { setState } = useStateMock();
useEffectMock();
useContextMock();

describe('useCounters', () => {
  it('should fetch counters on init', async () => {
    axios.get.mockResolvedValue({
      data: {
        counters: 4,
      },
    });
    useCounters();

    await wait();
    expect(setState).toHaveBeenCalledWith(4);
  });
});
