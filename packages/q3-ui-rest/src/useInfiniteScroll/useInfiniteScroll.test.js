import {
  useLayoutEffectMock,
  useRefMock,
  useStateMock,
  useEffectMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import useInfiniteScroll, {
  mergeUniq,
} from './useInfiniteScroll';

useLayoutEffectMock();
useEffectMock();
useRefMock();
const { setState } = useStateMock();

const mockIntersectionObs = (value) =>
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value,
  });

let poll;

beforeEach(() => {
  poll = jest.fn().mockResolvedValue({});
});

describe('InfiniteScroll', () => {
  it('should load more', (done) => {
    let num = 0;

    poll.mockResolvedValue({
      hasNextPage: false,
    });

    mockIntersectionObs(
      class {
        constructor(fn) {
          num += 1;
          fn([
            {
              isIntersecting: num === 1,
            },
          ]);
        }
      },
    );

    useInfiniteScroll({
      location: {
        search: '?foo=bar',
      },
      hasNextPage: true,
      data: [],
      poll,
    });

    expect(poll).toHaveBeenCalledWith('?foo=bar&page=1');
    setTimeout(() => {
      // stops timer
      expect(setState).toHaveBeenCalledWith(true);
      // sets next page
      expect(setState).toHaveBeenCalledWith(2);
      done();
    }, 10);
  });

  it('should not load more', () => {
    mockIntersectionObs(class {});

    useInfiniteScroll({
      hasNextPage: false,
      data: [],
      poll,
    });

    expect(poll).not.toHaveBeenCalled();
  });

  it('should make state unique', () => {
    expect(
      mergeUniq(
        [undefined, { id: 1 }, { id: 2 }],
        [[null, { id: 1 }, { id: 3 }]],
      ),
    ).toEqual([
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ]);
  });
});
