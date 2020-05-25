import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Csv } from './icons';
import useRow from './useRow';

const DataToCsv = ({ data }) => {
  const { t } = useTranslation('labels');
  const { downloadAsCsv } = useRow(data);

  return (
    <BottomNavigationAction
      label={t('toCsv')}
      icon={<Csv />}
      onClick={downloadAsCsv}
      showLabel
    />
  );
};

DataToCsv.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataToCsv;
