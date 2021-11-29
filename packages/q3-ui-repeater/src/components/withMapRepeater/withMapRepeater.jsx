import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';

const withMapRepeater = (Component) => {
  const Inner = ({ children, data, ...rest }) => {
    const { t } = useTranslation();
    const renderRepeater = () => (
      <Component data={data} {...rest}>
        {children}
      </Component>
    );

    const mapRepeater = () =>
      Object.entries(data).map(([key, xs]) => (
        <Component
          key={key}
          data={xs}
          ids={xs.map((item) => item.id)}
          groupName={t(key)}
          {...rest}
        >
          {children}
        </Component>
      ));

    return Array.isArray(data)
      ? renderRepeater()
      : mapRepeater();
  };

  Inner.propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
    children: PropTypes.node.isRequired,
  };

  return Inner;
};

export default withMapRepeater;
