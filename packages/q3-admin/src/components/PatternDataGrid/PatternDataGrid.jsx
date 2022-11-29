import React from 'react';
import PropTypes from 'prop-types';
import { isObject, map } from 'lodash';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import { useHelperFormats } from 'q3-ui-helpers/lib/hooks';
import { useTranslation } from 'q3-ui-locale';
import Pattern from '../Pattern';
import { usePatternData } from '../../hooks';
import useStyle from './styles';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const PatternDataGrid = (props) => {
  const ref = React.useRef();
  const { formatters, size, width } = props;
  const { t } = useTranslation('labels');
  const { data, ...patternProps } = usePatternData(props);
  const cls = useStyle();

  const generateColumns = () => {
    if (!Array.isArray(data)) return [];
    const obj = data[0];

    if (!isObject(obj)) return [];

    return Object.entries(obj)
      .filter(([key]) => !['_id', 'id'].includes(key))
      .map(([key]) => ({
        field: key,
        headerName: t(key),
        ...(isObject(width) && key in width
          ? { minWidth: width[key] }
          : { flex: 1 }),
        renderCell: ({ row, value }) => {
          const format = useHelperFormats(row);

          return isObject(formatters) && key in formatters
            ? format(key, formatters[key])
            : value;
        },
      }));
  };

  return (
    <Pattern
      {...props}
      {...patternProps}
      height="auto"
      size={size}
    >
      <DataGrid
        autoHeight
        className={cls.table}
        columns={generateColumns()}
        disableSelectionOnClick
        disableColumnMenu
        apiRef={ref}
        rows={map(data, (item, idx) => ({
          id: idx,
          ...item,
        }))}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Pattern>
  );
};

PatternDataGrid.defaultProps = {
  formatters: {},
  title: undefined,
  size: 'xl',
  width: {},
};

PatternDataGrid.propTypes = {
  /**
   * Keys of this object should correspond to field names; values of this object should correspond to func names in the useHelperFormats hook
   */
  formatters: PropTypes.shape({}),
  /**
   * The name of the report to fetch data
   */
  report: PropTypes.string.isRequired,
  /**
   * When undefined, the component takes the report value.
   */
  title: PropTypes.string,
  /**
   * Controls the Pattern's width.
   */
  size: PropTypes.string,
  /**
   * Keys of this object should correspond to field names; values of this object should specify column width in pixels
   */
  width: PropTypes.shape({}),
};

export default PatternDataGrid;
