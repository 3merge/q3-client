import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Alert from '.';

describe('Alert', () => {
  it('should dismiss on click', () => {
    const mounted = global.shallow(
      <Alert type="success" label="womp" />,
    );

    mounted.find(Button).simulate('click');
    expect(mounted.text()).toMatch('womp');
    expect(mounted.find(Collapse).props().in).toBeFalsy();
    expect(mounted.find(Box).props().className).toMatch(
      'success',
    );
  });

  it('should render a link', () =>
    expect(
      global
        .shallow(
          <Alert type="success" label="womp" link="to" />,
        )
        .find(Button),
    ).toHaveLength(2));

  it('should invoke callback', () => {
    const callback = jest.fn();

    global
      .shallow(
        <Alert
          type="success"
          label="womp"
          done={callback}
        />,
      )
      .find(Button)
      .simulate('click');
    expect(callback).toHaveBeenCalled();
  });

  it('should not render actions', () => {
    expect(
      global
        .shallow(
          <Alert
            type="success"
            label="womp"
            dismissable={false}
          />,
        )
        .find(Button).length,
    ).toBe(0);
  });
});
