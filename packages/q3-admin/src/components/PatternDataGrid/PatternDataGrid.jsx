import React from 'react';
import PropTypes from 'prop-types';
import { isObject, map } from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'q3-ui-locale';
import Pattern from '../Pattern';
import { useReportById } from '../../hooks';
import useStyle from './styles';

const PatternDataGrid = ({ formatters, report, title }) => {
  const { t } = useTranslation('labels');
  const ref = React.useRef();
  const { data, error, loading } = useReportById(report);
  const cls = useStyle();

  const generateColumns = () => {
    if (!Array.isArray(data)) return [];
    const obj = data[0];
    if (!isObject(obj)) return [];

    return Object.entries(obj).map(([key]) => ({
      field: key,
      headerName: t(key),
      flex: 1,
      minWidth: 115,
      renderCell: ({ value }) =>
        isObject(formatters) && key in formatters
          ? value
          : value,
    }));
  };

  return (
    <>
      <span ref={ref} />
      <Pattern
        error={error}
        loading={loading}
        size="lg"
        title={title || report}
      >
        <DataGrid
          autoHeight
          className={cls.table}
          columns={generateColumns()}
          disableSelectionOnClick
          disableColumnMenu
          rows={map(data, (item, idx) => ({
            id: idx,
            ...item,
          }))}
        />
      </Pattern>
    </>
  );
};

PatternDataGrid.defaultProps = {
  title: undefined,
};

PatternDataGrid.propTypes = {
  report: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default PatternDataGrid;
