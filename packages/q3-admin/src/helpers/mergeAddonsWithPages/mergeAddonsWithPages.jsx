import React from 'react';
import { isEqual, map, uniqWith } from 'lodash';

const mergeAddonsWithPages = (a = [], b = []) => {
  if (Array.isArray(a) && Array.isArray(b))
    return uniqWith(
      a.concat(
        map(b, (AddOn) => ({
          index: true,
          parent: 'addons',
          resourceName: String(AddOn?.name).toLowerCase(),
          component: () => (
            <main
              style={{
                overflow: 'auto',
                position: 'relative',
                height: 'calc((100 * var(--vh)) - 65px)',
                width: '100%',
              }}
            >
              <AddOn />
            </main>
          ),
        })),
      ),
      isEqual,
    );

  return a;
};

export default mergeAddonsWithPages;
