import React from 'react';
import Timeline from './Timeline';

export default {
  title: 'Q3 UI|Components/Timeline',
};

const getEntries = () => {
  const out = [];

  for (let i = 0; i < 1000; i += 1) {
    out.push({
      modifiedBy: {
        firstName: `Joe ${i}`,
        lastName: 'Blow',
      },
      modifiedOn: new Date().toISOString(),
      modified: {
        [`foo.${i}`]: i,
        bar: i,
      },
    });
  }

  return out;
};

export const WithSearch = () => (
  <Timeline entries={getEntries()} />
);
