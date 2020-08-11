import React from 'react';
import { get } from 'lodash';
import Button from '@material-ui/core/Button';
import FileListBreadcrumbs from './FileListBreadcrumbs';

const initialStateValue = {
  foo: {
    default: [],
    bar: {
      default: [],
      quuz: {
        test: { default: [] },
        default: [],
      },
    },
  },
  default: [],
};

describe('FileListBreadcrumbs', () => {
  it('should render each path as a button', () => {
    const el = global
      .shallow(
        <FileListBreadcrumbs
          setState={jest.fn}
          state={{ path: ['foo', 'bar'] }}
        />,
      )
      .find(Button);

    // plus home
    expect(el.length).toBe(3);

    // disable active directory
    expect(el.last().props()).toHaveProperty(
      'disabled',
      true,
    );
  });

  it('should reset the directory structure', () => {
    const setState = jest.fn();

    global
      .shallow(
        <FileListBreadcrumbs
          files={initialStateValue}
          setState={setState}
          state={{ path: ['foo'] }}
        />,
      )
      .find(Button)
      .first()
      .simulate('click');

    expect(setState).toHaveBeenCalledWith({
      data: initialStateValue,
      path: [],
    });
  });

  it('should change the directory structure', () => {
    const setState = jest.fn();

    global
      .shallow(
        <FileListBreadcrumbs
          files={initialStateValue}
          setState={setState}
          state={{ path: ['foo', 'bar', 'quuz'] }}
        />,
      )
      .find(Button)
      .at(2)
      .simulate('click');

    expect(setState).toHaveBeenCalledWith({
      data: get(initialStateValue, 'foo.bar'),
      path: ['foo', 'bar'],
    });
  });
});
