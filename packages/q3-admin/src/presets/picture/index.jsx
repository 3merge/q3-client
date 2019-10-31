import React from 'react';
import Axios from 'axios';
import Picture from 'q3-ui/picture';

const PictureUpload = ({ path, photo }) => (
  <Picture
    photo={photo}
    service={(data) =>
      Axios.post(`${path}/uploads`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
  />
);

export default PictureUpload;
