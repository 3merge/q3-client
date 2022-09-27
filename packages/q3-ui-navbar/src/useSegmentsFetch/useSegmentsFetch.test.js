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
const {
  changeReturnValue: changeReturnValueOfState,
  reset: resetState,
  setState,
} = useStateMock();

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
  setState.mockReset();
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

  it('should replace collection state after put', async () => {
    const initalState = [
      {
        id: 1,
        collectionName: 'test',
      },
      {
        id: 2,
        collectionName: 'test',
      },
      {
        id: 3,
        collectionName: 'test2',
      },
    ];

    jest.spyOn(axios, 'put').mockResolvedValue({
      data: {
        segments: [
          {
            id: 2,
            collectionName: 'test',
          },
        ],
      },
    });

    changeReturnValueOfState(initalState);

    const { update } = useSegmentsFetch();
    await update({
      action: 'remove',
      collectionName: 'test',
      payload: {
        id: 1,
      },
    });

    expect(setState.mock.calls[0][0](initalState)).toEqual([
      {
        id: 3,
        collectionName: 'test2',
      },
      {
        id: 2,
        collectionName: 'test',
      },
    ]);
  });
});
