import React from 'react';
import { browser } from 'q3-ui-helpers';
import DirectoryView from './DirectoryView';

const checkComponentDisplayName = (
  stateValue,
  displayName,
) => {
  jest
    .spyOn(React, 'useState')
    .mockReturnValue([stateValue, jest.fn()]);

  global.shallow(
    <DirectoryView>
      {(Element) => {
        const { type } = <Element />;
        expect(type.displayName).toMatch(displayName);
        return null;
      }}
    </DirectoryView>,
  );
};

describe('DirectoryView', () => {
  it('should call local storage', () => {
    const spy = jest.spyOn(browser, 'proxyLocalStorageApi');
    global.shallow(
      <DirectoryView>{() => null}</DirectoryView>,
    );

    expect(spy).toHaveBeenCalledWith(
      'getItem',
      'q3-filemanager-view',
    );
  });

  it('should change view', () => {
    const setState = jest.fn();
    const spy = jest.spyOn(browser, 'proxyLocalStorageApi');

    jest
      .spyOn(React, 'useState')
      .mockReturnValue(['list', setState]);

    global.shallow(
      <DirectoryView>
        {(_, Component) => {
          Component().props.onClick();
          return null;
        }}
      </DirectoryView>,
    );

    expect(setState).toHaveBeenCalledWith('gallery');
    expect(spy).toHaveBeenCalledWith(
      'setItem',
      'q3-filemanager-view',
      'gallery',
    );
  });

  it('should render list', () => {
    checkComponentDisplayName('list', 'list');
    checkComponentDisplayName('unknown', 'list');
  });

  it('should render gallery', () => {
    checkComponentDisplayName('gallery', 'gallery');
  });
});
