import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { invoke } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import Button from '@material-ui/core/Button';
import useStyle from './useStyle';

export const makeAnchor = (href) => href || '#';

export const toggleSelectedClass = (href) => (e) => {
  if (href) return;
  e.preventDefault();
  invoke(e, 'currentTarget.classList.toggle', 'selected');
};

const NavigationLink = ({
  children,
  includesPartiallyCurrent,
  label,
  to,
}) => {
  const { t } = useTranslation();
  const cls = useStyle();

  return (
    <Button
      fullWidth
      size="small"
      component={Link}
      to={makeAnchor(to)}
      tabIndex={to ? undefined : -1}
      onClick={toggleSelectedClass(to)}
      classes={{
        root: cls.menuItem,
        endIcon: cls.icon,
        label: cls.menuItemLabel,
      }}
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        const list = [cls.menuItem];

        if (!to) list.push(cls.anchor);
        if (includesPartiallyCurrent) list.push(cls.parent);
        else if (isCurrent || isPartiallyCurrent)
          [cls.active, 'current'].forEach((c) =>
            list.push(c),
          );

        return {
          className: classnames(list),
        };
      }}
      endIcon={children}
    >
      <span>{t(`labels:${label}`)}</span>
    </Button>
  );
};

NavigationLink.propTypes = {
  children: PropTypes.node,
  includesPartiallyCurrent: PropTypes.bool,
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
};

NavigationLink.defaultProps = {
  children: null,
  includesPartiallyCurrent: false,
  to: null,
};

export default NavigationLink;
