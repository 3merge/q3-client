import { useContextMock } from 'q3-ui-test-utils/lib/reactUtils';
import useSegmentsUpdate from './useSegmentsUpdate';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({
    search: '?qp&sort=name&limit=100&page=2',
  }),
}));

let update;
const { changeReturnValue: changeReturnValueOfContext } =
  useContextMock();

beforeAll(() => {
  global.alert = jest.fn().mockReturnValue('foobar');
  global.prompt = jest.fn().mockReturnValue('foobar');
});

beforeEach(() => {
  update = jest.fn();
  changeReturnValueOfContext({
    collectionName: 'test',
    update,
  });
});

describe('useSegmentsUpdate', () => {
  it('should create segment', () => {
    useSegmentsUpdate().add(null);
    expect(update).toHaveBeenCalledWith({
      action: 'create',
      collectionName: 'test',
      payload: {
        folderId: null,
        label: 'foobar',
        value: '?qp=true',
      },
    });
  });

  it('should create segment folder', () => {
    useSegmentsUpdate().addFolder(null);
    expect(update).toHaveBeenCalledWith({
      action: 'create',
      collectionName: 'test',
      payload: {
        folderId: null,
        folder: true,
        label: 'foobar',
      },
    });
  });

  it('should remove segment', () => {
    useSegmentsUpdate().remove(1);
    expect(update).toHaveBeenCalledWith({
      action: 'remove',
      collectionName: 'test',
      payload: {
        id: 1,
      },
    });
  });

  it('should rename segment', () => {
    useSegmentsUpdate().rename(1);
    expect(update).toHaveBeenCalledWith({
      action: 'rename',
      collectionName: 'test',
      payload: {
        id: 1,
        label: 'foobar',
      },
    });
  });

  it('should replace value', () => {
    useSegmentsUpdate().replace(1);
    expect(update).toHaveBeenCalledWith({
      action: 'replace',
      collectionName: 'test',
      payload: {
        id: 1,
        value: '?qp=true',
      },
    });
  });
});
