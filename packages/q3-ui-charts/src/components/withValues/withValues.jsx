import React from 'react';
import PropTypes from 'prop-types';

export default (Component, SubComponent) => {
  const ChartValue = ({
    activeDot,
    colours,
    dot,
    value,
    ...rest
  }) => {
    const sharedSubComponentProps = {
      activeDot,
      dot,
      radius: [4, 4, 0, 0],
      type: 'monotone',
    };

    return (
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
  };

  ChartValue.defaultProps = {
    activeDot: undefined,
    dot: false,
  };

  ChartValue.propTypes = {
    activeDot: PropTypes.shape({
      onClick: PropTypes.func,
    }),
    colours: PropTypes.arrayOf(PropTypes.string).isRequired,
    dot: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  };

  return ChartValue;
};
