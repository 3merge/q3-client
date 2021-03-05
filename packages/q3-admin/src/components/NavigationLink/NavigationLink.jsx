import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { invoke } from 'lodash';
import { useTranslation } from 'react-i18next';
import useStyle from './useStyle';

const NavigationLink = ({
  children,
  includesPartiallyCurrent,
  label,
  to,
}) => {
  const ref = React.useRef();
  const { t } = useTranslation();
  const cls = useStyle();

  return (
    <Link
      ref={ref}
      to={to || '#'}
      onClick={(e) => {
        if (!to) {
          e.preventDefault();
          invoke(
            e,
            'currentTarget.classList.toggle',
            'selected',
          );
        }
      }}
      className={cls.menuItem}
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        const list = [cls.menuItem];

        if (!to) list.push(cls.anchor);

        if (includesPartiallyCurrent) list.push(cls.parent);
        else if (isCurrent || isPartiallyCurrent)
          list.push(cls.active);

        return {
          className: classnames(list),
        };
      }}
    >
      {children}
      <span>{t(`labels:${label}`)}</span>
    </Link>
  );
};

NavigationLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
};

NavigationLink.defaultProps = {
  to: null,
};

export default NavigationLink;
