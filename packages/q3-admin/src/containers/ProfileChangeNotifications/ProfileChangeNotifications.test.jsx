import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { doesNotExist } from 'q3-ui-test-utils/lib/enzymeUtils';
import ProfileNotifications from './ProfileChangeNotifications';
import useProfileForm from '../../hooks/useProfileForm';
import useDomainContext from '../../hooks/useDomainContext';

jest.mock('../../hooks/useProfileForm');
jest.mock('../../hooks/useDomainContext');

describe('ProfileNotifications', () => {
  it('should reduce listeners', () => {
    useDomainContext.mockReturnValue({
      domain: {
        listens: {
          Developer: ['one', 'two'],
        },
      },
    });

    useProfileForm.mockReturnValue({
      initialValues: {
        role: 'Developer',
        listens: ['one', 'three'],
      },
    });

    expect(
      global
        .shallow(<ProfileNotifications />)
        .find(Form)
        .prop('initialValues'),
    ).toMatchObject({
      one: true,
      two: false,
    });
  });

  it('should disable', () => {
    useProfileForm.mockReturnValue({
      initialValues: {},
    });

    doesNotExist(
      global.shallow(<ProfileNotifications />).find(Form),
    );
  });

  it('should retain truthy values', () => {
    const onSubmit = jest.fn();

    useDomainContext.mockReturnValue({
      domain: {
        listens: {
          Developer: ['foo'],
        },
      },
    });

    useProfileForm.mockReturnValue({
      onSubmit,
      initialValues: {
        role: 'Developer',
      },
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
