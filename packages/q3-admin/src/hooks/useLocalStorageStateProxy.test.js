import { useStateMock } from 'q3-ui-test-utils/lib/reactUtils';
import localStorageUtils from 'q3-ui-test-utils/lib/localStorageUtils';
import useLocalStorageStateProxy from './useLocalStorageStateProxy';

const {
  assert: useStateAssert,
  reset: resetUseState,
  setState,
} = useStateMock();
const {
  changeReturnValue,
  hasGotten,
  hasSet,
  reset: resetLocalStorage,
} = localStorageUtils();

beforeEach(() => {
  resetUseState();
  resetLocalStorage();
});

describe('useLocalStorageStateProxy', () => {
  it('should return default value', () => {
    const testKey = 'foo';
    const testValue = 'bar';
    const output = useLocalStorageStateProxy(
      testKey,
      testValue,
    );

    hasGotten(testKey);
    useStateAssert(testValue);

    expect(output).toEqual([
      testValue,
      expect.any(Function),
    ]);
  });

  it('should return local storage value', () => {
    const testKey = 'foo';
    const testValue = 'bar';
    changeReturnValue(testValue);
    const output = useLocalStorageStateProxy(testKey);
    useStateAssert(testValue);
    hasGotten(testKey);

    expect(output).toEqual([
      testValue,
      expect.any(Function),
    ]);
  });

  it('should change state and local values', () => {
    const testKey = 'foo';
    const testValue = 'quuz';
    const [, set] = useLocalStorageStateProxy(testKey);

    set(testValue);
    expect(setState).toHaveBeenCalledWith(testValue);
    hasSet(testKey, testValue);
  });
});
