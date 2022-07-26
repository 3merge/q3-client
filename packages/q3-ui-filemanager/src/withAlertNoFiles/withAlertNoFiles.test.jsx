import React from 'react';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import withAlertNoFiles from './withAlertNoFiles';
import AlertNoFiles from '../AlertNoFiles';

const Component = withAlertNoFiles(() => null);

describe('withAlertNoFiles', () => {
  it('should render empty alert', () => {
    exists(global.mount(<Component />).find(AlertNoFiles));
  });

  it('should not render alert when there are files', () => {
    doesNotExist(
      global
        .mount(<Component files={[1, 2]} />)
        .find(AlertNoFiles),
    );
  });

  it('should not render alert when there are folders', () => {
    doesNotExist(
      global
        .mount(<Component siblings={[1, 2]} />)
        .find(AlertNoFiles),
    );
  });
});
