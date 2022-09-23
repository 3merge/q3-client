import React from 'react';
import { map } from 'lodash';
import { isCleanAndEqual } from '../../src/utils';

const useFixtureData = (initialState = []) => {
  const [state, setState] = React.useState(initialState);

  const getLastId = () => Math.max(...map(state, 'id'));

  const update = (args) => {
    let newState;
    const { action, collectionName, payload } = args;

    if (action === 'create') {
      setState((prevState) => {
        newState = prevState.concat({
          ...payload,
          id: getLastId() + 1,
          collectionName,
        });

        return newState;
      });
    }

    if (action === 'reorder') {
      const { entries = [] } = payload;
      setState((prevState) => {
        newState = entries.map(
          ({ folderId = null, id }) => ({
            ...prevState.find((prevItem) =>
              isCleanAndEqual(prevItem.id, id),
            ),
            collectionName,
            folderId,
            id,
          }),
        );

        return newState;
      });
    }

    if (action === 'rename') {
      const { id, label } = payload;
      setState((prevState) => {
        newState = prevState.map((item) => ({
          ...item,
          label: isCleanAndEqual(id, item.id)
            ? label
            : item.label,
        }));

        return newState;
      });
    }

    if (action === 'remove') {
      const { id } = payload;

      setState((prevState) => {
        newState = prevState.filter(
          (item) => !isCleanAndEqual(id, item.id),
        );

        return newState;
      });
    }

    if (action === 'replace') {
      const { id, value } = payload;
      setState((prevState) => {
        newState = prevState.map((item) => ({
          ...item,
          value: isCleanAndEqual(id, item.id)
            ? value
            : item.label,
        }));

        return newState;
      });
    }

    if (action === 'replaceVisibility') {
      const { id, visibility } = payload;

      setState((prevState) => {
        newState = prevState.map((item) => ({
          ...item,
          visibility: isCleanAndEqual(id, item.id)
            ? visibility
            : item.visibility,
        }));

        return newState;
      });
    }

    // the server only ever returns the active collection
    return newState.filter(
      (item) => item.collectionName === collectionName,
    );
  };

  return {
    data: state,
    update,
  };
};

export default useFixtureData;
