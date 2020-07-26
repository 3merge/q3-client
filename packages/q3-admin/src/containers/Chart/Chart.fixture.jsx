import React from 'react';
import MockRestAdapter from 'q3-ui-test-utils/lib/rest';

// eslint-disable-next-line
export default ({ children }) => (
  <MockRestAdapter
    delay={100}
    define={(m) => {
      m.onGet(/reports\?template=foo/).reply(200, {
        data: [
          {
            'country': 'AD',
            'hot dog': 66,
            'burger': 178,
            'sandwich': 87,
            'kebab': 45,
            'fries': 19,
            'donut': 193,
          },
          {
            'country': 'CA',
            'hot dog': 61,
            'burger': 12,
            'sandwich': 187,
            'kebab': 435,
            'fries': 149,
            'donut': 13,
          },
        ],
      });
    }}
  >
    {children}
  </MockRestAdapter>
);

export const FilterComponent = (props) => (
  <p>{`Prop keys: ${Object.keys(props).join(',')}`}</p>
);
