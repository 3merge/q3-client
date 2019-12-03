import React from 'react';
import Repeater from 'q3-ui/lib/repeater';
import { useAuth } from 'q3-ui-permissions';
import useRest from 'q3-ui-rest';
import RepeaterBuilder from '../repeater';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    canCreateSub: jest.fn().mockReturnValue(true),
    canEditSub: jest.fn().mockReturnValue(true),
    canDeleteSub: jest.fn().mockReturnValue(false),
    isDisabledPrefix: jest.fn(),
  }),
}));

jest.mock('q3-ui-rest', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    loading: true,
    companies: [{ name: 'Hooli' }, { name: 'Google' }],
    total: 2,
  }),
}));

test('RepeaterBuilder prop routing', () => {
  const initialValues = { name: '' };
  const wrapper = global.shallow(
    <RepeaterBuilder
      id="1"
      wizardProps={{ initialValues }}
      resourceName="lists"
      collectionName="companies"
      createdBy={{ id: '2' }}
      decorators={{
        get: jest.fn(),
        patch: jest.fn(),
      }}
    />,
  );

  const el = wrapper.find(Repeater);

  expect(useAuth).toHaveBeenCalledWith('companies', '2');

  expect(useRest).toHaveBeenCalledWith({
    key: 'lists',
    runOnInit: true,
    url: '/companies/1/lists',
    decorators: {
      get: expect.any(Function),
      patch: expect.any(Function),
    },
  });

  expect(el).toHaveLength(1);
  expect(el.props()).toMatchObject({
    data: expect.any(Array),
    name: 'lists',
    description: 'lists',
    wizardProps: {
      initialValues,
    },
  });
});
