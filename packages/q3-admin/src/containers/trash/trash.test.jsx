import React from 'react';
import { act } from 'react-dom/test-utils';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Alert from 'q3-ui/lib/alert';
import { Trash } from '.';

jest.useFakeTimers();
jest.mock('../state');

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

const makeThenable = () => {
  const promise = {};

  const thenable = (fn) => {
    fn();
    return promise;
  };

  return [promise, thenable];
};

beforeEach(() => {
  navigate.mockReset();
});

describe('Trash', () => {
  const renderAndClick = async (onDelete) => {
    const el = global.mount(
      <Trash
        onDelete={onDelete}
        directoryPath="/app/foo"
        collectionName="foo"
      />,
    );

    await act(async () => {
      el.find(Button)
        .props()
        .onClick();
    });

    el.update();
  };

  it('should redirect on resolve', async () => {
    const onClick = jest.fn().mockImplementation(() => {
      const [promise, thenable] = makeThenable();
      promise.then = thenable;
      promise.catch = thenable;
      promise.finally = thenable;
      return promise;
    });

    await renderAndClick(onClick);
    jest.runAllTimers();

    expect(onClick).toHaveBeenCalled();
    return expect(navigate).toHaveBeenCalledWith(
      '/app/foo',
    );
  });

  it('should do nothing on reject', async () => {
    const onClick = jest.fn().mockImplementation(() => {
      const [promise, thenable] = makeThenable();
      promise.then = () => promise;
      promise.catch = thenable;
      promise.finally = thenable;
      return promise;
    });

    await renderAndClick(onClick);
    jest.runAllTimers();

    expect(onClick).toHaveBeenCalled();
    return expect(navigate).not.toHaveBeenCalledWith(
      '/app/foo',
    );
  });

  it('should render alerts', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [true, jest.fn()]);

    const el = global.shallow(
      <Trash
        onDelete={jest.fn()}
        directoryPath="/app/foo"
        collectionName="foo"
      />,
    );

    expect(el.find(Alert)).toHaveLength(2);
  });
});
