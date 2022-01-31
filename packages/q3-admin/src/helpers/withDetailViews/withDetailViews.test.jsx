import React from 'react';
import {
  exists,
  doesNotExist,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import withDetailViews from './withDetailViews';
import ViewNotAllowed from '../../components/ViewNotAllowed';

const Component = () => <div />;
const Decorated = withDetailViews(Component);

describe('withDetailViews', () => {
  it('should show error message without a view', () => {
    exists(
      global.shallow(<Decorated />).find(ViewNotAllowed),
    );
  });

  it('should filter views', () => {
    exists(
      global
        .shallow(
          <Decorated protectView={() => false}>
            <Component name="foo" />
          </Decorated>,
        )
        .find(ViewNotAllowed),
    );
  });

  it('should filter views', () => {
    doesNotExist(
      global
        .shallow(
          <Decorated protectView={(name) => name !== 'bar'}>
            <Component name="foo" />
            <Component name="bar" />
          </Decorated>,
        )
        .find(ViewNotAllowed),
    );
  });
});
