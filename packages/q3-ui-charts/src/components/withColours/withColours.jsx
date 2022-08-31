import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { get } from 'lodash';

export default (Component) => {
  const Chart = (props) => {
    const theme = useTheme();
    const value = get(props, 'value');
    const defaultColor = theme.palette.secondary.main;

    return (
      <Component
        {...props}
        colours={
          Array.isArray(value)
            ? value.map((v) =>
                get(props, `colorMap.${v}`, defaultColor),
              )
            : [defaultColor]
        }
      />
    );
  };

  Chart.defaultProps = {};
  Chart.propTypes = {};

  return Chart;
};
