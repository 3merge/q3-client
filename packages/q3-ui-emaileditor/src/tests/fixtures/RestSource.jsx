/* eslint-disable react/prop-types */
import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import mjml1 from './data/template1';

export default ({ delay = 1000, children }) => {
  const defineMockRoutes = (m) => {
    m.onPost(/emails-preview/).reply(async () => {
      return [
        200,
        {
          html: '<p>Preview</p>',
        },
      ];
    });

    m.onGet(/emails/).reply(async () => {
      return [
        200,
        {
          emails: [
            {
              'id': '1',
              'name': '__header',
              'mjml': '',
            },
            {
              'id': '2',
              'name': '__header',
              'mjml': '',
            },
            {
              'id': '3',
              'name': 'password-reset',
              'mjml': mjml1,
            },
          ],
        },
      ];
    });
  };

  return (
    <Rest define={defineMockRoutes} delay={delay}>
      {children}
    </Rest>
  );
};
