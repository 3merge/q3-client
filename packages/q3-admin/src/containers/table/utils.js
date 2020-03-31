import DeleteSweep from '@material-ui/icons/DeleteSweep';

export const getActions = (name, deleteInBulkFn) => {
  const actions = [];

  if (deleteInBulkFn)
    actions.push({
      icon: DeleteSweep,
      onClick: deleteInBulkFn,
      label: 'Delete',
    });

  return actions;
};
