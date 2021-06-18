import React from 'react';
import PropTypes from 'prop-types';

export default (Component, SubComponent) => {
  const sharedSubComponentProps = {
    dot: false,
    radius: [4, 4, 0, 0],
    type: 'monotone',
  };

  const ChartValue = ({ colours, value, ...rest }) => (
    <Component {...rest}>
      {Array.isArray(value) ? (
        value.map((v, i) => (
          <SubComponent
            key={v}
            dataKey={v}
            fill={colours[i]}
            stroke={colours[i]}
            syncId={v}
            {...sharedSubComponentProps}
          />
        ))
      ) : (
        <SubComponent
          dataKey={value}
          stroke={colours[0]}
          fill={colours[0]}
          {...sharedSubComponentProps}
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
