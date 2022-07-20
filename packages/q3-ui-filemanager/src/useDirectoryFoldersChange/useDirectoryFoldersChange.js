import React from 'react';
import { join, size } from 'lodash';
import { object } from 'q3-ui-helpers';
import FileManagerContext from '../FileManagerContext';
import FileManagerBatchContext from '../FileManagerBatchContext';
import { withQueryParamIds } from '../utils';

const useDirectoryFoldersChange = () => {
  const ctx = React.useContext(FileManagerContext);
  const { selected } = React.useContext(
    FileManagerBatchContext,
  );

  return React.useCallback(
    ({ id, folderId }) =>
      object.noop(
        ctx.patch(
          withQueryParamIds(
            size(selected) ? join(selected, ',') : id,
          ),
        )({
          folderId,
        }),
      ),
    [selected],
  );
};

export default useDirectoryFoldersChange;
