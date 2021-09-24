import React from 'react';
import { Helmet } from 'react-helmet';
import { map } from 'lodash';

const mergeAddonsWithPages = (a = [], b = []) => {
  if (Array.isArray(a) && Array.isArray(b))
    return a.concat(
      map(b, (AddOn) => ({
        index: true,
        parent: 'addons',
        resourceName: String(AddOn?.name).toLowerCase(),
        component: () => {
          const height = 'calc((100 * var(--vh)) - 65px)';

          return (
            <main
              style={{
                overflow: 'auto',
                position: 'relative',

                width: '100%',
                height,
              }}
            >
              <Helmet>
                <style>
                  {`.CodeMirror { max-height: ${height} !important }`}
                </style>
              </Helmet>
              <AddOn />
            </main>
          );
        },
      })),
    );

  return a;
};

export default mergeAddonsWithPages;
