import { getCSV } from 'q3-ui-rest';
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteSweep from '@material-ui/icons/DeleteSweep';

export const getActions = (name, deleteInBulkFn) => {
  const actions = [
    {
      icon: FileCopy,
      onClick: (ids) =>
        getCSV(`/${name}?_id=${ids.join(',')}`),
      label: 'Export',
    },
  ];

  if (deleteInBulkFn)
    actions.push({
      icon: DeleteSweep,
      onClick: deleteInBulkFn,
      label: 'Delete',
    });

  return actions;
};
