import React from 'react';
import Picture from 'q3-ui/picture';
import useRest from 'q3-ui-rest';

const PictureUpload = ({ path, photo }) => {
  const { post } = useRest({
    url: path,
    key: 'n',
  });

  return (
    <Picture
      photo={photo}
      service={(formData) => post(formData)}
    />
  );
};

export default PictureUpload;
