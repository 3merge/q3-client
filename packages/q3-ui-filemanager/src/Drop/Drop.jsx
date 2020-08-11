import React from 'react';
import PropTypes from 'prop-types';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { browser } from 'q3-ui-helpers';
import { useDropzone } from 'react-dropzone';
import useStyles from './useStyle';

const Drop = ({ children, onDrop }) => {
  const [loading, setLoading] = React.useState();
  const { container: className, icon } = useStyles();

  const [pendingFiles, setPendingFiles] = React.useState(
    [],
  );

  const onDropHandler = React.useCallback(
    (acceptedFiles) => {
      const formData = new FormData();
      setPendingFiles(acceptedFiles);

      onDrop(formData)
        .then(() => {
          // clear pending
          setPendingFiles([]);
        })
        .finally(setLoading);
    },
    [],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop: onDropHandler,
  });

  const getDropperHandlers = () => ({
    id: 'dropper',
    className,
    ...(!loading ? getRootProps() : {}),
  });

  React.useEffect(() => {
    if (browser.isBrowserReady()) {
      const el = document.getElementById('dropper');

      if (isDragActive) {
        el.focus();
      } else {
        el.blur();
      }
    }
  }, [isDragActive]);

  return (
    <>
      <div
        style={{ marginBottom: '1rem' }}
        {...getDropperHandlers()}
      >
        <input {...getInputProps()} />
        <AttachFileIcon className={icon} /> Add file or
        drops file here
      </div>
      {children(pendingFiles)}
    </>
  );
};

Drop.propTypes = {
  onDrop: PropTypes.instanceOf(Promise).isRequired,
};

export default Drop;