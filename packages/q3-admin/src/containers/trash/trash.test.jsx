import React from 'react';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const renderAndClick = (onDelete) => {
    return global
      .shallow(
        <Trash
          onDelete={onDelete}
          directoryPath="/app/foo"
          collectionName="foo"
        />,
      )
      .find(Button)
      .props()
      .onClick();
  };

  it('should redirect on resolve', () => {
    const onClick = jest.fn().mockImplementation(() => {
      const [promise, thenable] = makeThenable();
      promise.then = thenable;
      promise.catch = thenable;
      promise.finally = thenable;
      return promise;
    });

    renderAndClick(onClick);
    jest.runAllTimers();

    expect(onClick).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/app/foo');
  });

  it('should do nothing on reject', () => {
    const onClick = jest.fn().mockImplementation(() => {
      const [promise, thenable] = makeThenable();
      promise.then = () => promise;
      promise.catch = thenable;
      promise.finally = thenable;
      return promise;
    });

    renderAndClick(onClick);
    jest.runAllTimers();

    expect(onClick).toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalledWith('/app/foo');
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
    expect(el.find(CircularProgress)).toHaveLength(1);
  });
});
