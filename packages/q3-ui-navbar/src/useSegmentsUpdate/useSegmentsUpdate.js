import React from 'react';
import { omit } from 'lodash';
import { useLocation } from '@reach/router';
import { useQueryParams } from 'q3-ui-queryparams';
import NavbarListItemContext from '../NavbarListItemContext';
import SegmentsContext from '../SegmentsContext';

const useSegmentsUpdate = () => {
  const { update } = React.useContext(SegmentsContext);
  const { collectionName } = React.useContext(
    NavbarListItemContext,
  );

  const { search } = useLocation();
  const qp = useQueryParams(search);

  const getCurrentValue = () =>
    qp.encode(
      // these are all special params
      omit(qp.decode(search), [
        'fields',
        'limit',
        'page',
        'sort',
      ]),
    );

  const execUpdate = (action, payload = {}) =>
    update({
      action,
      collectionName,
      payload,
    });

  const withPromptEntry = (fn) => {
    // eslint-disable-next-line
    const label = prompt('Please enter a name');
    if (label) fn(label);
  };

  return {
    addSegment(folderId = null) {
      const value = getCurrentValue();
      if (!value || value === '?') {
        alert('Cannot');
        return null;
      }

      return withPromptEntry((label) =>
        execUpdate('create', {
          folderId,
          label,
          value,
        }),
      );
    },
    addSegmentFolder(folderId = null) {
      return withPromptEntry((label) =>
        execUpdate('create', {
          folder: true,
          folderId,
          label,
        }),
      );
    },
    remove(id) {
      return execUpdate('create', {
        id,
      });
    },
    rename(id) {
      return withPromptEntry((label) =>
        execUpdate('rename', {
          label,
          id,
        }),
      );
    },
    reorder(entries = []) {
      return execUpdate('reorder', {
        entries,
      });
    },
    replace(id) {
      return execUpdate('replace', {
        id,
        value: getCurrentValue(),
      });
    },
    replaceVisibility(id, visibility = []) {
      return execUpdate('replaceVisibility', {
        id,
        visibility,
      });
    },
  };
};

export default useSegmentsUpdate;
