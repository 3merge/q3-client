import React from 'react';
import { PhotoUpload } from 'q3-ui-filemanager';
import { Definitions, Dispatcher, Store } from '../state';

export const DetailFeaturedPhoto = () => {
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const { collectionName } = React.useContext(Definitions);

  return (
    <PhotoUpload
      collectionName={collectionName}
      src={data.photo}
      upload={patch()}
    />
  );
};

export default DetailFeaturedPhoto;
