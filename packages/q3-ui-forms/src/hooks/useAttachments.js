import React from 'react';
import { set } from 'lodash';
import { useDropzone } from 'react-dropzone';
import { DispatcherState } from '../FormsContext';

export const cleanDropzoneInputProps = (inputProps) => {
  const copy = { ...inputProps };
  delete copy.ref;
  delete copy.style;
  delete copy.tabIndex;
  return copy;
};

export const getDropzoneRejectedMessages = (e) =>
  e && Array.isArray(e.errors)
    ? e.errors.map((err) => err.message).join(', ')
    : null;

export const setNextState = (name, file) => (
  prevState = {},
) => {
  const clone = { ...prevState };
  if (file) {
    clone[name] = file;
  } else {
    delete clone[name];
  }

  return clone;
};

export default (name, args = {}) => {
  const {
    setAttachments,
    setFieldValue,
    setFieldError,
  } = React.useContext(DispatcherState);

  const addToAttachmentsState = (file) => {
    setAttachments(setNextState(name, file));
    setFieldValue(name, file.name);
  };

  const removeFromAttachmentsState = () => {
    setAttachments(setNextState(name));
    setFieldValue(name, '');
  };

  const onDropHandler = React.useCallback(
    (acceptedFiles, rejectedFiles) => {
      const [file] = acceptedFiles;

      const e = getDropzoneRejectedMessages(
        rejectedFiles[0],
      );

      if (e) {
        removeFromAttachmentsState();
        setFieldError(name, e);
      } else {
        addToAttachmentsState(file);
        setFieldError(name, null);
      }
    },
    [],
  );

  const {
    getRootProps,
    getInputProps,
    inputRef,
  } = useDropzone({
    maxSize: 500000,
    multiple: false,
    onDrop: onDropHandler,
    noKeyboard: true,
    ...args,
  });

  const inputProps = cleanDropzoneInputProps(
    getInputProps(),
  );

  const onClear = (e) => {
    e.stopPropagation();
    set(inputRef, 'current.value', null);
    removeFromAttachmentsState();
    setFieldError(name, null);
  };

  return {
    rootProps: getRootProps(),
    inputProps,
    inputRef,
    onClear,
  };
};
