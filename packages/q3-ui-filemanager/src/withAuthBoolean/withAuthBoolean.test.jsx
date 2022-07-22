import React from 'react';
import {
  exists,
  doesNotExist,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import withAuthBoolean from './withAuthBoolean';

const checkRender = (prop, fn) => {
  const Component = withAuthBoolean(
    () => <div id="test" />,
    prop,
  );

  fn(global.mount(<Component />).find('#test'));
};

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    canSee: true,
    canCreate: false,
  });
});

describe('withAuthBoolean', () => {
  it('should block render', () => {
    checkRender('canCreate', doesNotExist);
  });

  it('should render', () => {
    checkRender('canSee', exists);
  });
});
