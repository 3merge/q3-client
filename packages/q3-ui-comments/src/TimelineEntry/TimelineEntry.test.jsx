import React from 'react';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineEntry from './TimelineEntry';

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
