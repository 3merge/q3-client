import React from 'react';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import { Area } from 'recharts';
import { CustomLineChart } from './Line';

describe('Line', () => {
  it('should show area with single child', () => {
    exists(
      global
        .shallow(
          <CustomLineChart name="Key" value="Value">
            <div />
          </CustomLineChart>,
        )
        .find(Area),
    );
  });

  it('should hide area', () => {
    doesNotExist(
      global
        .shallow(
          <CustomLineChart name="Key" value="Value">
            <div />
            <div />
            <div />
          </CustomLineChart>,
        )
        .find(Area),
    );
  });
});
