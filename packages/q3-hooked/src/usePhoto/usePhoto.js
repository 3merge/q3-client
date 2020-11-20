import React from 'react';
import { Dispatcher, Store } from '../context';

export const FEATURED_UPLOAD_KEY = 'featuredUpload';

const usePhoto = () => {
  const store = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const update = patch();

  return {
    src: store?.data?.photo,
    onDrop: update,

    customizer: () => FEATURED_UPLOAD_KEY,
    can: true,
    // can: can('picture'),

    onDelete: () =>
      update({
        [FEATURED_UPLOAD_KEY]: null,
      }),
  };
};

export default usePhoto;
