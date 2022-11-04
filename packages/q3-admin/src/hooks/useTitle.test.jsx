import {
  useContextMock,
  useCallbackMock,
  useMemoMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import { useAuth } from 'q3-ui-permissions';
import useTitle from './useTitle';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

const ctx = useContextMock();
useCallbackMock();
useMemoMock();

describe('useTitle', () => {
  it('should return title value', () => {
    const canEditSub = jest.fn().mockReturnValue(true);
    useAuth.mockReturnValue({
      canEditSub,
    });

    ctx.changeReturnValue({
      data: { foo: 'test' },
      patch: jest.fn().mockReturnValue(jest.fn()),
    });

    const v = useTitle({
      editable: true,
      titleProp: 'foo',
    });

    expect(v).toMatchObject({
      editable: true,
      text: 'test',
      update: expect.any(Function),
    });

    expect(canEditSub).toHaveBeenCalledWith('foo');
  });

  it('should return title value with parentheses', () => {
    const canEditSub = jest.fn().mockReturnValue(true);
    const editable = jest.fn().mockReturnValue(true);

    useAuth.mockReturnValue({
      canEditSub,
    });

    ctx.changeReturnValue({
      data: { foo: 'test', bar: '#1' },
      patch: jest.fn().mockReturnValue(jest.fn()),
    });

    const v = useTitle({
      editable,
      titleProp: 'foo',
      parenthesesProp: 'bar',
    });

    expect(v).toMatchObject({
      editable: true,
      text: 'test (#1)',
      update: expect.any(Function),
    });

    expect(canEditSub).toHaveBeenCalledWith('foo');
    expect(editable).toHaveBeenCalledWith(
      {
        foo: 'test',
        bar: '#1',
      },
      {
        canEditSub,
      },
    );
  });

  it('should custom render title text', () => {
    const canEditSub = jest.fn().mockReturnValue(false);
    const editable = jest.fn().mockReturnValue(true);

    useAuth.mockReturnValue({
      canEditSub,
    });

    ctx.changeReturnValue({
      data: { foo: 'test', bar: '#1' },
      patch: jest.fn().mockReturnValue(jest.fn()),
    });

    const v = useTitle({
      editable,
      titleRenderer: ({ foo, bar }) => `${foo} - ${bar}`,
    });

    expect(v).toMatchObject({
      editable: false,
      text: 'test - #1',
      update: expect.any(Function),
    });

    expect(canEditSub).not.toHaveBeenCalledWith();
    expect(editable).not.toHaveBeenCalled();
  });
});
