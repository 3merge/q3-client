import React from 'react';
import { navigate } from 'gatsby';
import FormBoxNotice from '../FormBoxNotice';
import withSuccessOp from '../withSuccessOp';

jest.mock('gatsby', () => ({
  navigate: jest.fn(),
  Link: () => <div />,
}));

const Box = () => <div />;
const Component = withSuccessOp(Box, 'testing');

describe('withSuccessOp', () => {
  it('should not render notice', () => {
    const el = global.shallow(
      <Component
        location={{
          search: '?foo=bar',
        }}
      />,
    );

    expect(el.find(FormBoxNotice).exists()).toBeFalsy();
  });

  it('should render notice with message', () => {
    const notice = global
      .shallow(
        <Component
          location={{
            search: '?op=success',
          }}
        />,
      )
      .find(FormBoxNotice);

    expect(notice.exists()).toBeTruthy();
    expect(notice.prop('title')).toMatch('testing');
  });

  it('should navigate', () => {
    global
      .shallow(
        <Component
          location={{
            pathname: 'foo',
          }}
        />,
      )
      .find(Box)
      .props()
      .onSuccess();

    expect(navigate).toHaveBeenCalledWith('foo?op=success');
  });
});
