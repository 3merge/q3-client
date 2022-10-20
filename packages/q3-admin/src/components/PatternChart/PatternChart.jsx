import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'q3-ui-charts';
import Pattern from '../Pattern';
import { useReportById } from '../../hooks';
import useStyle from './styles';

const PatternDataGrid = ({
  ChartProps,
  report,
  title,
  size,
}) => {
  const cls = useStyle();
  const { data, error, loading } = useReportById(report);

  return (
    <Pattern
      error={error}
      loading={loading}
      size={size}
      title={title || report}
    >
      <div className={cls.root}>
        <Chart
          {...ChartProps}
          {...data}
          enableDownload={false}
          title=""
        />
      </div>
    </Pattern>
  );
};

PatternDataGrid.defaultProps = {
  ChartProps: {},
  title: undefined,
  size: 'xl',
};

PatternDataGrid.propTypes = {
  ChartProps: PropTypes.shape({}),
  report: PropTypes.string.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
};

export default PatternDataGrid;
