import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useNotification } from 'q3-ui-forms';
import IconButton from 'q3-ui/lib/iconButton';

const Upload = ({ name, fileType, icon, url }) => {
  const ref = React.useRef();
  const noti = useNotification();

  const upload = React.useCallback(({ target }) => {
    const formData = new FormData();
    const { files = [] } = target;
    formData.append(name, files[0], {
      type: fileType,
    });

    Axios.post(url, formData)
      .then(({ data: { message } }) => {
        noti.onSuccess(message);
      })
      .catch(() => {
        noti.onFail();
      });
  }, []);

  const open = React.useCallback(
    () => ref.current.click(),
    [],
  );

  return (
    <div>
      <input
        id="hidden-file-uploader"
        type="file"
        ref={ref}
        style={{ display: 'none' }}
        onChange={upload}
      />
      <IconButton
        label={name}
        icon={icon}
        buttonProps={{ onClick: open }}
        inputRef={ref}
      />
    </div>
  );
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
Upload.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  fileType: PropTypes.string,
};

Upload.defaultProps = {
  fileType: 'text/csv',
};

export default Upload;
