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
  variant: LINE,
};

Charts.propTypes = {
  variant: PropTypes.oneOf([BAR, LINE, TABLE]),
};

export default Charts;
