import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default (Component) => {
  const Chart = (props) => {
    const color = useTheme()?.palette?.secondary;

    return (
      <Component
        {...props}
        colours={[color?.main, color?.dark]}
      />
    );
  };

  Chart.defaultProps = {};
  Chart.propTypes = {};

  return Chart;
};
