import useSegmentsFromCollection from './useSegmentsFromCollection';
import {
  // eslint-disable-next-line
  set,
  // eslint-disable-next-line
  remove,
  // eslint-disable-next-line
  rename,
} from './useSegmentsFromProfile';

jest.mock('./useSegments', () =>
  jest.fn().mockReturnValue({
    active: 'Test',
  }),
);

jest.mock('./useSegmentsFromProfile', () => {
  const context = {
    set: jest.fn(),
    remove: jest.fn(),
    rename: jest.fn(),
    asArray: [],
  };

  const hook = jest.fn().mockReturnValue(context);
  Object.entries(context).forEach(([key, value]) => {
    hook[key] = value;
  });

  return hook;
});

beforeAll(() => {
  global.prompt = () => 'INPUT';
});

describe('useSegmentsFromCollection', () => {
  it('should set', () => {
    const s = useSegmentsFromCollection()[0];
    s.onClick();
    expect(s.label).toMatch('addSegment');
    expect(set).toHaveBeenCalledWith('INPUT');
  });

  it('should rename', () => {
    const s = useSegmentsFromCollection()[1];
    s.onClick();
    expect(s.label).toMatch('renameSegment');
    expect(rename).toHaveBeenCalledWith('INPUT', 'Test');
  });

  it('should replace', () => {
    const s = useSegmentsFromCollection()[2];
    s.onClick();
    expect(s.label).toMatch('replaceSegment');
    expect(set).toHaveBeenCalledWith('Test');
  });

  it('should remove', () => {
    const s = useSegmentsFromCollection()[3];
    s.onClick();
    expect(s.label).toMatch('removeSegment');
    expect(remove).toHaveBeenCalledWith('Test');
  });
});
