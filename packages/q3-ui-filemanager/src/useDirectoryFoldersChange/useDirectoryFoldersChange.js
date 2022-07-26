import React from 'react';
import { size } from 'lodash';
import { object } from 'q3-ui-helpers';
import FileManagerContext from '../FileManagerContext';
import FileManagerBatchContext from '../FileManagerBatchContext';

const useDirectoryFoldersChange = () => {
  const ctx = React.useContext(FileManagerContext);
  const { clearSelected, selected } = React.useContext(
    FileManagerBatchContext,
  );

  return React.useCallback(
    ({ id, folderId }) =>
      object.noop(
        (size(selected)
          ? ctx.patchBulk(selected)
          : ctx.patch(id))({
          folderId,
        }).then(clearSelected),
      ),
    [selected],
  );
};

export default useDirectoryFoldersChange;
