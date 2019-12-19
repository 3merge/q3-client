import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Repeater, {
  InteractiveListItem,
  DialogForm,
  DataList,
} from '../repeater';
import IconEmpty from '../../icons/empty';

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

  describe('InteractiveListItem', () => {
    it('should forward props to ListItemText', () => {
      const placeholder = 'PrimaryText';
      const { primary } = global
        .shallow(
          <InteractiveListItem primary={placeholder} />,
        )
        .find(ListItemText)
        .props();
      expect(primary).toMatch(placeholder);
    });

    it('should render children inside ListItemSecondaryAction', () => {
      const Mock = () => null;
      const inst = global
        .shallow(
          <InteractiveListItem primary="Hey">
            <Mock />
          </InteractiveListItem>,
        )
        .find(ListItemSecondaryAction)
        .dive()
        .find(Mock);
      expect(inst).toHaveLength(1);
    });
  });

  describe('DialogForm', () => {
    it('should pass open and close functions to its props', () => {
      const renderTrigger = jest.fn();
      const renderContent = jest.fn();
      global.shallow(
        <DialogForm
          title="Test"
          renderTrigger={renderTrigger}
          renderContent={renderContent}
        />,
      );

      expect(renderTrigger).toHaveBeenCalledWith(
        expect.any(Function),
      );
      expect(renderContent).toHaveBeenCalledWith(
        expect.any(Function),
      );
    });
  });

  describe('DataList', () => {
    it('should render empty icon', () =>
      expect(
        global
          .shallow(
            <DataList
              data={[]}
              getForm={jest.fn()}
              primary={jest.fn()}
              secondary={jest.fn()}
            />,
          )
          .find(IconEmpty),
      ).toHaveLength(1));
  });
});
