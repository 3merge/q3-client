import React from 'react';
import Box from '@material-ui/core/Box';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import DetailHeader from './DetailHeader';

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({});
});

describe('DetailHeader', () => {
  it('should render title and subtitle', () => {
    exists(
      global
        .shallow(
          <DetailHeader>
            <div />
          </DetailHeader>,
        )
        .find(Box),
    );
  });

  it('should render title only', () => {
    doesNotExist(
      global.shallow(<DetailHeader />).find(Box),
    );
  });
});
