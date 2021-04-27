import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import Form from 'q3-ui-forms/lib/builders/Form';
import TextBase from 'q3-ui-forms/lib/fields/TextBase';
import { act } from 'react-dom/test-utils';
import FileListMake from './FileListMake';

const clickIconButton = (el) => {
  act(() => {
    el.find(IconButton)
      .prop('buttonProps')
      .onClick({
        preventDefault: jest.fn(),
        target: {
          name: 'Test',
        },
      });
  });
};

describe('FileListBreadcrumbs', () => {
  it('should add new default path to state', async () => {
    const setState = jest.fn();

    const el = global.mount(
      <FileListMake
        setState={setState}
        state={{ data: {} }}
      />,
    );

    clickIconButton(el);

    await act(async () => {
      el.update();
      el.find(Form).props().onSubmit({
        name: 'req',
      });
    });

    expect(setState).toHaveBeenCalledWith({
      data: {
        req: {
          default: [],
        },
      },
    });
  });

  it('should disallow duplicate paths', async () => {
    const el = global.mount(
      <FileListMake
        setState={jest.fn()}
        state={{ data: { foo: { default: [] } } }}
      />,
    );

    clickIconButton(el);

    await act(async () => {
      el.update();

      el.find(TextBase)
        .props()
        .onChange({
          target: {
            value: 'foo',
          },
        });
    });

    await act(async () => {
      el.update();

      expect(el.find(TextBase).props()).toHaveProperty(
        'error',
        true,
      );
    });
  });
});
