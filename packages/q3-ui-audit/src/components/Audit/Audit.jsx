import React from 'react';
import { isObject, get, pick } from 'lodash';
import Timeline from '../Timeline';

const compareChangeLogWithCurrent = (xs = {}) => (
  target,
) => {
  try {
    const firstKey = Object.keys(target)[0];

    if (
      Object.keys(target).length === 1 &&
      isObject(target[firstKey])
    ) {
      const nested = get(xs, firstKey);

      if (Array.isArray(nested)) {
        return JSON.stringify(
          {
            [firstKey]: nested.find(
              (item) =>
                item.id ===
                (target[firstKey]._id ||
                  target[firstKey].id),
            ),
          },
          null,
          2,
        );
      }

      return JSON.stringify(
        { [firstKey]: nested },
        null,
        2,
      );
    }

    return JSON.stringify(
      pick(xs, Object.keys(target)),
      null,
      2,
    );
  } catch (e) {
    return JSON.stringify({}, null, 2);
  }
};

const Audit = ({ current, data }) => (
  <Timeline
    compareChangeLogWithCurrent={compareChangeLogWithCurrent(
      current,
    )}
    data={data}
  />
);

export default Audit;
