import React from 'react';
import Graphic from 'q3-ui-assets';
import DrawerBody from './DrawerBody';

jest.mock('./useStyle', () =>
  jest.fn().mockReturnValue({}),
);

const stubContext = (args) =>
  jest.spyOn(React, 'useContext').mockReturnValue(args);

const getChild = () =>
  global
    .shallow(
      <DrawerBody>
        <div id="interior" />
      </DrawerBody>,
    )
    .find('#interior');

const getNamespaceFromErrorComponent = () =>
  global
    .shallow(
      <DrawerBody>
        <div />
      </DrawerBody>,
    )
    .find(Graphic)
    .props().title;

describe('DrawerBody', () => {
  it('should render empty message', () => {
    stubContext({ hasError: false, items: [] });
    expect(getChild()).toHaveLength(0);
    expect(getNamespaceFromErrorComponent()).toMatch(
      'Empty',
    );
  });

  it('should render error message', () => {
    stubContext({ hasError: true, items: [] });
    expect(getChild()).toHaveLength(0);
    expect(getNamespaceFromErrorComponent()).toMatch(
      'Error',
    );
  });

  it('should render child', () => {
    stubContext({ hasError: false, items: [1] });
    expect(getChild()).toHaveLength(1);
  });
});
