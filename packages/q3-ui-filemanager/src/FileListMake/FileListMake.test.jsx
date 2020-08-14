import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import Form from 'q3-ui-forms/lib/builders/Form';
import TextBase from 'q3-ui-forms/lib/fields/TextBase';
import { act } from 'react-dom/test-utils';
import FileListMake from './FileListMake';

describe('FileListBreadcrumbs', () => {
  it('should add new default path to state', async () => {
    const setState = jest.fn();

    const el = global.mount(
      <FileListMake
        setState={setState}
        state={{ data: {} }}
      />,
    );

    act(() => {
      el.find(IconButton).simulate('click');
    });

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

    act(() => {
      el.find(IconButton).simulate('click');
    });

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
