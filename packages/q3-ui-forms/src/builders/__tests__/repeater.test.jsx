import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Repeater, { DataList } from '../repeater';

jest.mock('formik');

jest.mock('useful-state/lib/useValue', () => () => ({
  onChange: jest.fn(),
  value: 'DELETE',
}));

describe('Repeater', () => {
  describe('Default component', () => {
    const Stub = () => null;
    const commons = {
      collectionName: 'foo',
      name: 'bar',
      primary: jest.fn(),
      secondary: jest.fn(),
      create: jest.fn(),
      edit: jest.fn(),
      remove: jest.fn(),
      initialValues: {},
      data: [],
    };

    const render = () => {
      const { getForm } = global
        .shallow(
          <Repeater {...commons}>
            <Stub title="dialog" />
          </Repeater>,
        )
        .find(DataList)
        .props();

      return getForm;
    };

    it('should configure underlying form (child)', () => {
      const getForm = render();
      return expect(
        getForm(true, { foo: 'bar' }, 1)(jest.fn()),
      ).toMatchObject({
        props: {
          isNew: true,
          onReset: expect.any(Function),
          onSubmit: expect.any(Function),
          initialValues: {
            foo: 'bar',
          },
        },
      });
    });

    it('should not call on reject', () => {
      commons.create.mockRejectedValue('Bad Request');

      const done = jest.fn();
      const getForm = render();
      const fn = getForm();
      const decoratedStub = fn(done);
      return decoratedStub.props.onSubmit().catch(() => {
        expect(done).not.toHaveBeenCalled();
      });
    });

    it('should call done on resolve', () => {
      commons.edit.mockImplementation((id) => () =>
        Promise.resolve(id),
      );

      const done = jest.fn();
      const getForm = render();
      const fn = getForm(false, { foo: 'bar' }, 3);
      const decoratedStub = fn(done);

      return decoratedStub.props.onSubmit().then(() => {
        expect(done).toHaveBeenCalled();
      });
    });
  });
});
