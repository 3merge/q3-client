import React from 'react';
import { exists } from 'q3-ui-test-utils/lib/enzymeUtils';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import DirectoryBreadcrumbs from './DirectoryBreadcrumbs';
import useDirectoryFolders from '../useDirectoryFolders';

jest.mock('../useDirectoryFolders');

describe('DirectoryBreadcrumbs', () => {
  it('should render breadcrumbs', () => {
    useDirectoryFolders.mockReturnValue({
      breadcrumbs: [
        {
          id: 1,
          name: 'first-level',
        },
      ],
    });

    exists(
      global
        .shallow(<DirectoryBreadcrumbs />)
        .find(Breadcrumbs),
    );
  });

  it('should default to null when changing backwards', () => {
    const change = jest.fn();
    useDirectoryFolders.mockReturnValue({
      breadcrumbs: [
        {
          id: 1,
          name: 'first-level',
        },
      ],
      change,
    });

    global
      .shallow(<DirectoryBreadcrumbs />)
      .find(IconButton)
      .first()
      .props()
      .onClick();

    expect(change).toHaveBeenCalledWith(null);
    const el = global.shallow(<DirectoryBreadcrumbs />);
    const currentDir = el.find('strong');
    expect(currentDir.length).toBe(1);
    expect(currentDir.text()).toMatch('first-level');
  });

  it('should find last breadcrumb when changing backwards', () => {
    const change = jest.fn();
    useDirectoryFolders.mockReturnValue({
      breadcrumbs: [
        {
          id: 1,
          name: 'first-level',
        },
        {
          id: 2,
          name: 'second-level',
        },
        {
          id: 3,
          name: 'third-level',
        },
      ],
      change,
    });

    const el = global.shallow(<DirectoryBreadcrumbs />);
    const currentDir = el.find('strong');
    expect(currentDir.length).toBe(1);
    expect(currentDir.text()).toMatch('third-level');

    el.find(IconButton).first().props().onClick();
    expect(change).toHaveBeenCalledWith(2);
  });
});
