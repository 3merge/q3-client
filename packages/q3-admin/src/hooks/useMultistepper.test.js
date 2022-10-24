import {
  useStateMock,
  useEffectMock,
  useContextMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import useMultistepper from './useMultistepper';

const context = useContextMock();
const state = useStateMock();
const effect = useEffectMock();

beforeEach(() => {
  context.reset();
  effect.reset();
  state.reset();
});

describe('useMultistepper', () => {
  it('should set initial state', () => {
    const fn = jest.fn().mockReturnValue(2);
    context.changeReturnValue({
      data: {
        foo: 1,
      },
      state: {
        profile: {
          id: 1,
        },
      },
    });

    useMultistepper(fn);
    expect(fn).toHaveBeenCalledWith({ foo: 1 }, { id: 1 });
    expect(state.setState).toHaveBeenCalledWith(2);
  });

  it('should mark as completed', () => {
    const fn = jest.fn().mockReturnValue(2);
    context.changeReturnValue({
      data: {},
      state: {},
    });

    expect(
      useMultistepper(fn).getStepProps(1),
    ).toMatchObject({
      disabled: false,
      completed: true,
    });
  });

  it('should mark as disabled', () => {
    const fn = jest.fn().mockReturnValue(1);
    context.changeReturnValue({
      data: {},
      state: {},
    });

    expect(
      useMultistepper(fn).getStepProps(3),
    ).toMatchObject({
      disabled: true,
      completed: false,
    });
  });

  it('should mark as current', () => {
    const fn = jest.fn().mockReturnValue(2);
    context.changeReturnValue({
      data: {},
      state: {},
    });

    expect(
      useMultistepper(fn).getStepProps(2),
    ).toMatchObject({
      disabled: false,
      completed: false,
    });
  });
});
