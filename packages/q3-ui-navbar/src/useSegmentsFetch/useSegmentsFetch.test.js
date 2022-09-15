import {
  useContextMock,
  useEffectMock,
  useStateMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import { wait } from 'q3-ui-test-utils/lib/enzymeUtils';
import axios from 'axios';
import useSegmentsFetch from './useSegmentsFetch';

const {
  changeReturnValue: changeReturnValueOfContext,
  reset: resetContext,
} = useContextMock();
const { reset: resetState, setState } = useStateMock();

const makeDeveloperObject = (developer) => ({
  state: {
    profile: {
      developer,
    },
  },
});

useEffectMock();

jest.spyOn(axios, 'get').mockResolvedValue({
  data: {
    segments: ['test'],
  },
});

beforeEach(() => {
  resetContext();
  resetState();
});

describe('useSegmentsFetch', () => {
  it('should return developer attribute as enabled', () => {
    changeReturnValueOfContext(makeDeveloperObject(true));
    expect(useSegmentsFetch()).toMatchObject({
      enabled: true,
    });
  });

  it('should call sys for segment data', async () => {
    changeReturnValueOfContext(makeDeveloperObject(false));
    useSegmentsFetch();

    await wait();
    expect(setState).toHaveBeenCalledWith(['test']);
    expect(setState).toHaveBeenCalledWith(true);
  });
});
