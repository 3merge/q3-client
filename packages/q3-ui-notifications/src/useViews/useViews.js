import React from 'react';
import { useQueryParams } from 'q3-ui-queryparams';
import { get } from 'lodash';
import moment from 'moment';

const useViews = (view) => {
  const { encode } = useQueryParams();

  return React.useMemo(
    (xs) => ({
      search: encode({
        ...xs,
        ...get(
          {
            all: {
              archived: 'exists(false)',
            },
            archived: {
              archived: 'exists(true)',
            },
            latest: {
              archived: 'exists(false)',
              'createdAt>': moment()
                .subtract('1', 'week')
                .startOf('day')
                .toISOString(),
            },
            unread: {
              archived: 'exists(false)',
              read: 'exists(false)',
            },
          },
          view,
          {},
        ),
      }).concat('&sort=-createdAt&limit=50'),
    }),
    [view],
  );
};

export default useViews;
