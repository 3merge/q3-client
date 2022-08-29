import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { useAuth } from 'q3-ui-permissions';
import useRest from 'q3-ui-rest';
import { find, isNil, sortBy, size } from 'lodash';
import { object } from 'q3-ui-helpers';

// debounce?

const useCheckList = ({ collectionName, id }) => {
  const { canSee } = useAuth(collectionName);
  const [localTasks, setLocalTasks] = React.useState();

  const {
    fetching,
    fetchingError,
    get,
    tasks = null,
    ...etc
  } = useRest({
    key: 'tasks',
    pluralized: 'tasks',
    url: `/${collectionName}/${id}/tasks`,
    runOnInit: false,
  });

  const hasInit = React.useMemo(
    () => !isNil(localTasks),
    [localTasks],
  );

  const isEmpty = React.useMemo(
    () => hasInit && !size(localTasks),
    [hasInit, localTasks],
  );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const task = find(
      localTasks,
      (t) => String(t.seq) === String(oldIndex),
    );

    return etc.patch(task.id)({
      seq: newIndex,
    });
  };

  React.useEffect(() => {
    if (canSee && !hasInit) object.noop(get());
  }, [canSee, hasInit]);

  React.useEffect(() => {
    setLocalTasks(
      Array.isArray(tasks) ? sortBy(tasks, 'seq') : tasks,
    );
  }, [tasks]);

  console.log(tasks);

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
