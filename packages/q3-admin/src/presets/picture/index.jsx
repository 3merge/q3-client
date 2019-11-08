import React from 'react';
import Axios from 'axios';
import Picture from 'q3-ui/picture';

const PictureUpload = ({ path, photo }) => (
  <Picture
    photo={photo}
    service={(data) => {
      return Axios.post(`${path}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }}
  />
);

export default PictureUpload;
