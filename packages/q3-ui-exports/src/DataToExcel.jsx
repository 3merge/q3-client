import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReactExport from 'react-data-export';
import { Excel } from './icons';
import { getColumns, getData } from './helpers';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;

const DataToExcel = ({ data, name }) => {
  const { t } = useTranslation('labels');
  const sheet = [
    {
      columns: getColumns(data, t),
      data: getData(data, t),
    },
  ];

  return (
    <ExcelFile
      element={
        <BottomNavigationAction
          label={t('toExcel')}
          icon={<Excel />}
          showLabel
        />
      }
    >
      <ExcelSheet name={t(name)} dataSet={sheet} />
    </ExcelFile>
  );
};

DataToExcel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string,
};

DataToExcel.defaultProps = {
  name: 'sheet1',
};

export default DataToExcel;
