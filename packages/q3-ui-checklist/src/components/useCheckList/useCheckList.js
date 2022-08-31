import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { useAuth } from 'q3-ui-permissions';
import useRest from 'q3-ui-rest';
import {
  differenceWith,
  isNil,
  sortBy,
  size,
  isEqual,
} from 'lodash';
import { object } from 'q3-ui-helpers';

// debounce?

const useCheckList = ({ collectionName, id }) => {
  const { canSee } = useAuth(collectionName);
  const [localTasks, setLocalTasks] = React.useState();
  const { fetching, fetchingError, get, ...etc } = useRest({
    key: 'tasks',
    pluralized: 'tasks',
    url: '/tasks',
    runOnInit: false,
    location: {
      search: `collectionName=${collectionName}&ref=${id}`,
    },
  });

  const hasInit = React.useMemo(
    () => !isNil(localTasks),
    [localTasks],
  );

  const isEmpty = React.useMemo(
    () => hasInit && !size(localTasks),
    [hasInit, localTasks],
  );

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    const newArray = arrayMove(
      localTasks,
      oldIndex,
      newIndex,
    );

    setLocalTasks(newArray);
    const output = newArray.reduce((acc, curr, idx) => {
      if (!isEqual(curr, localTasks[idx]))
        acc.push({
          id: curr.id,
          seq: idx + 1,
        });

      return acc;
    }, []);

    // wee need some sort of bulk operator.

    return Promise.all(
      output.map((item) =>
        etc.patch(item.id)({
          seq: item.seq,
        }),
      ),
    )
      .then(() => etc.poll())
      .catch(() => {
        // noop
      });
  };

  React.useEffect(() => {
    if (canSee && !hasInit)
      object.noop(
        get().then(({ tasks }) => {
          setLocalTasks(sortBy(tasks, 'seq'));
        }),
      );
  }, [canSee, hasInit]);

  return {
    ...etc,
    authError: !canSee,
    fetching,
    fetchingError,
    isEmpty,
    tasks: localTasks,
    onSortEnd,
  };
};

export default useCheckList;
