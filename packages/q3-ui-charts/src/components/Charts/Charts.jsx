import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../Bar';
import Line from '../Line';
import Table from '../Table';

const BAR = 'Bar';
const LINE = 'Line';
const TABLE = 'Table';

const Charts = ({ variant, ...rest }) => {
  const El = {
    Bar,
    Line,
    Table,
  }[variant];

  return <El {...rest} />;
};

Charts.defaultProps = {
  activeDot: {},
  colorMap: {},
  customControls: null,
  dot: false,
  enableDownload: true,
  enableGrid: true,
  enableTooltip: true,
  enableXAxis: true,
  enableYAxis: true,
  enableYAxisMobile: false,
  style: null,
  title: undefined,
  variant: LINE,
  xAxisTitle: undefined,
  yAxisTitle: undefined,
  yAxisProps: undefined,
};

Charts.propTypes = {
  /**
   * Attach click handler to the hovered dot on a line graph
   */
  activeDot: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  /**
   * Each key should correspond with a <code>value</code>
   */
  // eslint-disable-next-line
  colorMap: PropTypes.object,
  /**
   * Render something above the chart
   */
  customControls: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  /**
   * Each object should contain keys corresponding with the <code>name</code> and <code>value</code> props
   */
  // eslint-disable-next-line
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Plots dots along the line graph
   */
  dot: PropTypes.bool,

  /**
   * Renders CSV and Excel data download options
   */
  enableDownload: PropTypes.bool,

  /**
   * Show gridded lines
   */
  enableGrid: PropTypes.bool,

  /**
   * Render a tooltip for each point on the axis
   */
  enableTooltip: PropTypes.bool,

  /**
   * Show x-axis values
   */
  enableXAxis: PropTypes.bool,

  /**
   * Show y-axis values
   */
  enableYAxis: PropTypes.bool,

  /**
   * Determines if the y-axis disappears on mobile
   */
  enableYAxisMobile: PropTypes.bool,

  /**
   * Maps a particular key in each data object to the x-axis
   */
  name: PropTypes.string.isRequired,

  /**
   * Controls inner chart's height (and other attributes)
   */
  style: PropTypes.shape({
    height: PropTypes.number,
  }),

  /**
   * Add a title to the paper
   */
  title: PropTypes.string,

  /**
   * Renders a caption for the x-axis
   */
  xAxisTitle: PropTypes.string,

  /**
   * Renders a caption for the y-axis
   */
  yAxisTitle: PropTypes.string,

  yAxisProps: PropTypes.shape({
    tickFormatter: PropTypes.func,
  }),

  /**
   * Maps a particular key in each data object to the y-axis
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,

  /**
   * When invoking container component, specify variant of the chart.
   */
  variant: PropTypes.oneOf([BAR, LINE, TABLE]),
};

export default Charts;
