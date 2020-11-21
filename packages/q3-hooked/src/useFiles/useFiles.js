import React from 'react';
import useRest from 'q3-ui-rest';
import { get } from 'lodash';
import { Definitions } from '../context';

const useFiles = () => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const state = useRest({
    runOnInit: true,
    url: `/${collectionName}/${id}/uploads`,
    key: 'uploads',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return {
    loading: get(state, 'fetching', false),
    files: get(state, 'uploads', []),
    onDelete: get(state, 'remove'),
    onDrop: get(state, 'post'),
  };
};

export default useFiles;
