import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  hasNoneOf,
  hasSomeOf,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import DirectoryPendingFiles from './DirectoryPendingFiles';

describe('DirectoryPendingFiles', () => {
  it('should suppress alerts', () => {
    hasNoneOf(
      global.shallow(<DirectoryPendingFiles />).find(Alert),
    );
  });

  it('should render alerts', () => {
    hasSomeOf(
      global
        .shallow(
          <DirectoryPendingFiles
            pending={[{ name: 'foo.jpg' }]}
          />,
        )
        .find(Alert),
    );
  });

  it('should render error if one file has an error', () => {
    expect(
      global
        .shallow(
          <DirectoryPendingFiles
            pending={[
              { name: 'foo.jpg', error: true },
              { name: 'bar.pdf', error: false },
            ]}
          />,
        )
        .find(Alert)
        .prop('severity'),
    ).toMatch('error');
  });

  it('should render uploading message', () => {
    expect(
      global
        .shallow(
          <DirectoryPendingFiles
            pending={[
              { name: 'foo.jpg', error: false },
              { name: 'bar.pdf', error: false },
            ]}
          />,
        )
        .find(Alert)
        .prop('severity'),
    ).toMatch('info');
  });
});
