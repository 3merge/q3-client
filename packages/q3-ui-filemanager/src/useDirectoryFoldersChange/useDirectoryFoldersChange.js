import React from 'react';
import { join, size } from 'lodash';
import { object } from 'q3-ui-helpers';
import FileManagerContext from '../FileManagerContext';
import FileManagerBatchContext from '../FileManagerBatchContext';
import { withQueryParamIds } from '../utils';

const useDirectoryFoldersChange = () => {
  const ctx = React.useContext(FileManagerContext);
  const { clearSelected, selected } = React.useContext(
    FileManagerBatchContext,
  );

  return React.useCallback(
    ({ id, folderId }) =>
      object.noop(
        ctx
          .patch(
            withQueryParamIds(
              size(selected) ? join(selected, ',') : id,
            ),
          )({
            folderId,
          })
          .then(clearSelected),
      ),
    [selected],
  );
};

export default useDirectoryFoldersChange;
