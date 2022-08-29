import React from 'react';
import PropTypes from 'prop-types';
import CheckListContainer from '../CheckListContainer';
import CheckListContext from '../CheckListContext';
import useCheckList from '../useCheckList';

const CheckList = ({ collectionName, id }) => {
  const {
    authError,
    fetching,
    fetchingError,
    isEmpty,
    onSortEnd,
    tasks = [],
    ...checkListProps
  } = useCheckList({
    collectionName,
    id,
  });

  if (authError) return 'Cannot see this';
  if (fetching) return '...';
  if (fetchingError) return 'Whoops';
  if (isEmpty) return 'Noop';

  return (
    <CheckListContext.Provider value={checkListProps}>
      <CheckListContainer
        onSortEnd={onSortEnd}
        tasks={tasks}
      />
    </CheckListContext.Provider>
  );
};

CheckList.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CheckList;
