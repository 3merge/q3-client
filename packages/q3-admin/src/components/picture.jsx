import React from 'react';
import Axios from 'axios';
import Picture from 'q3-ui/lib/picture';

const PictureUpload = ({ url, photo }) => (
  <Picture
    photo={photo}
    service={(data) => {
      return Axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }}
  />
);

export default PictureUpload;
