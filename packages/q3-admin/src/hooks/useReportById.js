import React from 'react';
import { Definitions } from '../containers/state';
import useReport from './useReport';

const useReportById = (template, query = {}) => {
  const { id } = React.useContext(Definitions);
  return useReport(template, {
    ...query,
    id,
  });
};

export default useReportById;
