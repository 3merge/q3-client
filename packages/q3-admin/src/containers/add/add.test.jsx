import React from 'react';
import { navigate } from '@reach/router';
import Add, {
  addToDirectoryPath,
  getIdByKey,
  handleSuccess,
} from './add';
import CreateDialog from './dialog';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    Hide: jest
      .fn()
      .mockImplementation(({ children }) => children),
  }),
}));

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

beforeAll(() => {
  jest
    .spyOn(React, 'useMemo')
    .mockImplementation((fn) => fn());
});

describe('Add', () => {
  it('should block Dialog from rendering without children', () => {
    const el = global.shallow(<Add />);
    expect(el.find(CreateDialog)).toHaveLength(0);
  });

  it('should return the ID', () => {
    expect(getIdByKey({ foo: { id: 1 } }, 'foo')).toBe(1);
  });

  it('should not call navigate without an ID', () => {
    addToDirectoryPath('/app/foo');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should call navigate with an ID', () => {
    addToDirectoryPath('/app/foo', 1);
    expect(navigate).toHaveBeenCalledWith('/app/foo/1');
  });

  it('should call next', () => {
    const fn = jest.fn();
    handleSuccess('foo', 'bar', fn)({ done: 1 });
    expect(fn).toHaveBeenCalledWith({ done: 1 });
  });

  it('should pass properties to children', () => {
    const spy = jest.spyOn(React, 'cloneElement');

    jest.spyOn(React, 'useContext').mockReturnValue({
      post: jest.fn(),
      collectionName: null,
    });

    global
      .shallow(
        <Add onComplete={jest.fn()}>
          <div />
        </Add>,
      )
      .find(CreateDialog)
      .props()
      .children();

    expect(spy).toHaveBeenCalledWith(expect.any(Object), {
      isNew: true,
      collectionName: null,
      onSubmit: expect.any(Function),
    });
  });
});
