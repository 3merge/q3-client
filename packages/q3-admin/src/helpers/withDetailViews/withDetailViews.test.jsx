import React from 'react';
import {
  exists,
  doesNotExist,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import withDetailViews from './withDetailViews';
// eslint-disable-next-line
import { check } from '../../hooks/useAppContext';
import ViewNotAllowed from '../../components/ViewNotAllowed';

const Component = () => <div />;
const Decorated = withDetailViews(Component);

jest.mock('../../hooks/useAppContext', () => {
  const fn = jest.fn();
  const hook = jest.fn().mockReturnValue({
    check: fn,
  });

  hook.check = fn;
  return hook;
});

beforeEach(() => {
  check.mockClear();
});

describe('withDetailViews', () => {
  it('should show error message without a view', () => {
    exists(
      global.shallow(<Decorated />).find(ViewNotAllowed),
    );
  });

  it('should filter views', () => {
    check.mockReturnValue(false);

    exists(
      global
        .shallow(
          <Decorated>
            <Component name="foo" />
          </Decorated>,
        )
        .find(ViewNotAllowed),
    );
  });

  it('should filter views', () => {
    check.mockReturnValue(true);

    doesNotExist(
      global
        .shallow(
          <Decorated>
            <Component name="foo" />
            <Component name="bar" />
          </Decorated>,
        )
        .find(ViewNotAllowed),
    );

    expect(check).toHaveBeenCalledWith(
      'foo',
      {
        component: expect.any(Function),
        label: 'foo',
        to: '/',
      },
      {},
    );

    expect(check).toHaveBeenCalledWith(
      'bar',
      {
        component: expect.any(Function),
        label: 'bar',
        to: '/bar',
      },
      {},
    );
  });
});
