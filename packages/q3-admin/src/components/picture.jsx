import React from 'react';
import Axios from 'axios';
import Picture from 'q3-ui/lib/picture';
import { Definitions, Store } from '../containers/state';

const PictureUpload = () => {
  const {
    data: { photo },
  } = React.useContext(Store);
  const { id, collectionName } = React.useContext(
    Definitions,
  );

  return (
    <Picture
      photo={photo}
      service={(data) => {
        return Axios.post(
          `/${collectionName}/${id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      }}
    />
  );
};

export default PictureUpload;
