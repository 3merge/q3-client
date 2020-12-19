import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import useStyle from './useStyle';

const NavigationLink = ({ label, to, icon: Icon }) => {
  const { t } = useTranslation();
  const cls = useStyle();

  const El = to
    ? (props) =>
        React.createElement(Link, {
          ...props,
          to,
        })
    : (props) => React.createElement('span', props);

  return (
    <El className={cls.menuItem}>
      {Icon && <Icon color="inherit" />}
      <span>{t(`labels:${label}`)}</span>
    </El>
  );
};

NavigationLink.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
  to: PropTypes.string,
};

NavigationLink.defaultProps = {
  icon: null,
  to: null,
};

export default NavigationLink;
