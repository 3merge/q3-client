import React from 'react';
import PropTypes from 'prop-types';

export default (Component, SubComponent) => {
  const ChartValue = ({ colours, value, ...rest }) => (
    <Component {...rest}>
      {Array.isArray(value) ? (
        value.map((v, i) => (
          <SubComponent
            dataKey={v}
            fill={colours[i]}
            key={v}
            stroke={colours[i]}
            type="monotone"
            radius={[4, 4, 0, 0]}
          />
        ))
      ) : (
        <SubComponent
          dataKey={value}
          stroke={colours[0]}
          fill={colours[0]}
          type="monotone"
          radius={[4, 4, 0, 0]}
        />
      )}
    </Component>
  );

  ChartValue.defaultProps = {};

  ChartValue.propTypes = {
    colours: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  };

  return ChartValue;
};
