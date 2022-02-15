import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import { size } from 'lodash';
import { object } from 'q3-ui-helpers';

const withMapRepeater = (Component) => {
  const Inner = ({ children, data, ...rest }) => {
    const { t } = useTranslation();

    const renderRepeater = () => (
      <Component data={data} {...rest}>
        {children}
      </Component>
    );

    const mapRepeater = () =>
      Object.entries(data).map(
        ([key, xs]) =>
          size(xs) !== 0 && (
            <Component
              key={key}
              data={xs}
              ids={xs.map((item) => item.id)}
              groupName={t(key)}
              {...rest}
            >
              {children}
            </Component>
          ),
      );

    return React.useMemo(
      () =>
        Array.isArray(data)
          ? renderRepeater()
          : mapRepeater(),
      [object.toJSON(data), object.toJSON(rest)],
    );
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
