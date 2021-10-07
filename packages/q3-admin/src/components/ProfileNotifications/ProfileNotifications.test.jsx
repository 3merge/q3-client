import React from 'react';
import { Form } from 'q3-ui-forms/lib/builders';
import ProfileNotifications from './ProfileNotifications';
import useProfileForm from '../../hooks/useProfileForm';

jest.mock('../../hooks/useProfileForm');

describe('ProfileNotifications', () => {
  it('should reduce listeners', () => {
    useProfileForm.mockReturnValue({
      initialValues: {
        listens: ['one'],
      },
    });

    expect(
      global
        .shallow(<ProfileNotifications />)
        .find(Form)
        .prop('initialValues'),
    ).toMatchObject({
      one: true,
    });
  });

  it('should render empty', () => {
    useProfileForm.mockReturnValue({
      initialValues: {},
    });

    expect(
      global
        .shallow(<ProfileNotifications />)
        .find(Form)
        .prop('initialValues'),
    ).toEqual({});
  });

  it('should retain truthy values', () => {
    const onSubmit = jest.fn();

    useProfileForm.mockReturnValue({
      onSubmit,
    });

    global
      .shallow(<ProfileNotifications />)
      .find(Form)
      .props()
      .onSubmit({
        thunk: true,
        foo: true,
        bar: false,
        quuz: null,
      });

    expect(onSubmit).toHaveBeenCalledWith({
      listens: ['foo', 'thunk'],
    });
  });
});
