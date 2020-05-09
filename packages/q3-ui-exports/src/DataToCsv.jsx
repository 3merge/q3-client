import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CsvDownload from 'react-json-to-csv';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Csv } from './icons';
import { renameKeys } from './helpers';

export const CsvDownloadI18Implementation = (data) =>
  React.forwardRef(({ onClick, ...rest }, ref) => {
    const { t } = useTranslation('labels');
    const rows = data.map((row) => renameKeys(row, t));
    return (
      <div style={{ display: 'flex' }} ref={ref}>
        <CsvDownload {...rest} data={rows} />
      </div>
    );
  });

const DataToCsv = ({ data }) => {
  const { t } = useTranslation('labels');

  return (
    <BottomNavigationAction
      label={t('toCsv')}
      icon={<Csv />}
      component={CsvDownloadI18Implementation(data)}
      showLabel
    />
  );
};

DataToCsv.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataToCsv;
