import React from 'react';
import moment from 'moment';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineEntry, { getTime } from './TimelineEntry';

test.each([
  [moment().subtract(2, 'minute'), '2min'],
  [moment().subtract(1, 'hour'), '1hr'],
  [moment().subtract(49, 'hour'), '2d'],
])('.getTime(%s)', (a, expected) => {
  expect(getTime(a)).toMatch(expected);
});

test.each([[true], [false]])(
  '<TimelineEntry connector={%b} /> should conditionally render TimelineConnector',
  (bool) => {
    expect(
      global
        .shallow(
          <TimelineEntry
            connector={bool}
            createdBy={{
              photo: 'https://images.google.ca',
            }}
          />,
        )
        .find(TimelineConnector)
        .exists(),
    ).toEqual(bool);
  },
);
