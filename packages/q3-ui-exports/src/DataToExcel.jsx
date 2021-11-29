import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Excel } from './icons';
import useRow from './useRow';

const DataToExcel = ({ data }) => {
  const { t } = useTranslation('labels');
  const { downloadAsExcel } = useRow(data);

  return (
    <BottomNavigationAction
      label={t('toExcel')}
      icon={<Excel />}
      onClick={downloadAsExcel}
      showLabel
    />
  );
};

DataToExcel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataToExcel;
