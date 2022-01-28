import React from 'react';
import Filter from '../../../src/components/Filter';

const Add = () => (
  <Filter
    data={{
      demo: {
        type: 'Date',
      },
      createdAt: {
        type: 'Date',
      },
      updatedAt: {
        type: 'Date',
      },
    }}
  />
);

export default Add;
