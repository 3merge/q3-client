import React from 'react';
import { useDropzone } from 'react-dropzone';

const Button = ({ children, onDrop }) => {
  const [loading, setLoading] = React.useState();

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropHandler,
  });

  const getDropperHandlers = () => ({
    id: 'dropper',

    ...(!loading ? getRootProps() : {}),
  });

  return (
    <>
      <div
        style={{ marginBottom: '1rem' }}
        {...getDropperHandlers()}
      >
        <input {...getInputProps()} />
      </div>
      {children(pendingFiles)}
    </>
  );
};

Button.propTypes = {};

export default Button;
