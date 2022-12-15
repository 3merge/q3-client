import React from 'react';
import DocScanCommander from '../DocScanCommander';
import Context from '../Context';
import { getRefNode } from '../utils';

const useOpenCv = (canvasOutputElement) => {
  const { cv } = React.useContext(Context);
  const scan = DocScanCommander(cv);

  return (canvasInputElement, options) =>
    (canvasInputElement, canvasOutputElement)
      ? scan(
          getRefNode(canvasInputElement),
          getRefNode(canvasOutputElement),
          options,
        )
      : null;
};

export default useOpenCv;
