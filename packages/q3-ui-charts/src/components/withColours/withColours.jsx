import React from 'react';
import ColorScheme from 'color-scheme';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';

const isNotPureWhite = (colour) =>
  String(colour).toLowerCase() !== 'ffffff';

const hexify = (colour) => (colour ? `#${colour}` : '#000');

export default (Component) => {
  const Chart = (props) => (
    <Component
      {...props}
      colours={new ColorScheme()
        .from_hex(
          String(
            useTheme()?.palette?.secondary?.main,
          ).replace('#', ''),
        )
        .scheme('triade')
        .distance(0.1)
        .variation('pastel')
        .web_safe(true)
        .colors()
        .filter(isNotPureWhite)
        .map(hexify)}
    />
  );

  Chart.defaultProps = {};
  Chart.propTypes = {};

  return Chart;
};
