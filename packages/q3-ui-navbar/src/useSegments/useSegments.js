import React from 'react';
import SegmentsContext from '../SegmentsContext';

const useSegments = () => {
  const { data } = React.useContext(SegmentsContext);

  const combineWithAppPages = (pages) =>
    // for each page... each
    pages;

  const getActive = () => null;

  return {
    getActive,
    combineWithAppPages,
  };
};

export default useSegments;
