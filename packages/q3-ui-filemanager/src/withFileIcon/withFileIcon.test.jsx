import React from 'react';
import withFileIcon from './withFileIcon';

describe('withFileIcon', () => {
  it('should detect file type from url', () => {
    const Component = withFileIcon(({ icon, fileType }) => {
      expect(fileType).toMatch('jpg');
      expect(icon().props['data-icon']).toMatch(
        'ImageIcon',
      );

      return null;
    });

    global.mount(
      <Component url="https://google.ca/foo.jpg" />,
    );
  });

  it('should return folder icon', () => {
    const Component = withFileIcon(({ icon, fileType }) => {
      expect(fileType).toBeNull();
      expect(icon().props['data-icon']).toMatch(
        'FolderOpenIcon',
      );

      return null;
    });

    global.mount(
      <Component folder url="https://google.ca/foo.jpg" />,
    );
  });
});
