import React from 'react';
import Axios from 'axios';

export default ({ name, label, fileType, url }) => {
  const ref = React.useRef();

  const upload = ({ target }) => {
    const formData = new FormData();
    const { files = [] } = target;
    formData.append(name, files[0], {
      type: fileType,
    });

    Axios.post(url, formData)
      .then(() => {
        // nothing really happens
      })
      .catch(() => {
        // done
      });
  };

  const open = React.useCallback(() => {
    ref.current.click();
    ref.current.addEventListener('change', upload);
  }, []);

  return {
    label,
    onClick: open,
    element: (
      <input
        id="hidden-file-uploader"
        type="file"
        ref={ref}
        style={{ display: 'none' }}
      />
    ),
  };
};
