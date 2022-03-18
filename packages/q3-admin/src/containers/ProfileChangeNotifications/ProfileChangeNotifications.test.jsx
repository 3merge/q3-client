import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import ProfileNotifications from './ProfileChangeNotifications';
import useProfileForm from '../../hooks/useProfileForm';
import useDomainContext from '../../hooks/useDomainContext';

jest.mock('../../hooks/useProfileForm');
jest.mock('../../hooks/useDomainContext');

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

  it('should disable', () => {
    useProfileForm.mockReturnValue({
      initialValues: {},
    });

    expect(
      global
        .shallow(<ProfileNotifications />)
        .find(Form)
        .prop('disabled'),
    ).toBeTruthy();
  });

  it('should not disable', () => {
    useDomainContext.mockReturnValue({
      domain: {
        listens: {
          Developer: ['foo', 'bar'],
        },
      },
    });
    useProfileForm.mockReturnValue({
      initialValues: {
        role: 'Developer',
      },
    });

    const el = global.shallow(<ProfileNotifications />);

    expect(el.find(Form).prop('disabled')).toBeFalsy();
    expect(el.find(Field)).toHaveLength(2);
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
