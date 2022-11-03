import { first } from 'lodash';
import {
  useContextMock,
  useEffectMock,
  useRefMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import useNotifications from './useNotifications';

const ctx = useContextMock();
const effect = useEffectMock();
const ref = useRefMock();

let markAsSeen;
let post;

beforeEach(() => {
  markAsSeen = jest.fn();
  post = jest.fn().mockReturnValue({
    then: jest
      .fn()
      .mockImplementation((callback) => callback()),
  });

  ctx.changeReturnValue({
    data: [{ id: 1 }],
    error: false,
    markAsSeen,
    post,
  });
});

beforeEach(() => {
  ctx.reset();
  effect.reset();
});

describe('useNotifications', () => {
  it('should run on change', () => {
    ref.current = true;

    useNotifications();
    expect(post).toHaveBeenCalled();
    expect(ref.current).toBeFalsy();
  });

  it('should not run on change', () => {
    ref.current = false;

    useNotifications();
    expect(post).not.toHaveBeenCalled();
  });

  it('should call markAsSeen with ID', () => {
    ref.current = false;

    const data = first(useNotifications().data);
    data.acknowledge();
    expect(markAsSeen).toHaveBeenCalledWith(data.id);
  });

  it('should call markAsSeen with ID', () => {
    const id = '123';
    useNotifications().acknowledge(null, id);
    expect(markAsSeen).toHaveBeenCalledWith(id);
    expect(ref.current).toBeTruthy();
  });
});
