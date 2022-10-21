import React from 'react';
import { Definitions } from '../containers/state';
import useReport from './useReport';

const useReportById = (template) => {
  const { id } = React.useContext(Definitions);
  return useReport(template, {
    id,
  });
};

export default useReportById;
