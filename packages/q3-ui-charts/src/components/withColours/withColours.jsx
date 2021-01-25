import React from 'react';
import ColorScheme from 'color-scheme';
import PropTypes from 'prop-types';

const isNotPureWhite = (colour) =>
  String(colour).toLowerCase() !== 'ffffff';

const hexify = (colour) => (colour ? `#${colour}` : '#000');

export default (Component) => {
  const Chart = ({ hex, ...rest }) => (
    <Component
      {...rest}
      colours={new ColorScheme()
        .from_hex(hex)
        .scheme('tetrade')
        .distance(0.1)
        .add_complement(true)
        .variation('hard')
        .web_safe(true)
        .colors()
        .filter(isNotPureWhite)
        .map(hexify)}
    />
  );

  Chart.defaultProps = {
    hex: '2e2947',
  };

  Chart.propTypes = {
    hex: PropTypes.string,
  };

  return Chart;
};
