import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import {
  Menu,
  MenuList,
  MenuItem,
  Drawer,
  Divider,
  useMediaQuery,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { isFunction, map } from 'lodash';
import { useOpen } from 'useful-state';
import CheckIcon from '@material-ui/icons/Check';
import useStyle from './styles';

// eslint-disable-next-line
const MobileMenu = ({ children, ...rest }) => (
  <Drawer {...rest}>
    <MenuList>{children}</MenuList>
  </Drawer>
);

const DropdownMenu = ({ id, children, items, ...etc }) => {
  const { t } = useTranslation('labels');
  const { isOpen, anchorEl, close, open } = useOpen();
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );

  const cls = useStyle();
  const Element = isMobile ? MobileMenu : Menu;

  return (
    <>
      {children(open, isOpen)}
      <Element
        id={id}
        anchorEl={anchorEl}
        anchor="bottom"
        getContentAnchorEl={null}
        open={isOpen}
        onClose={close}
        elevation={5}
        {...etc}
      >
        {map(items, (item, i) =>
          item.divider ? (
            <Divider
              className={cls.divider}
              component="li"
              key={i}
            />
          ) : (
            <li key={item.label}>
              <MenuItem
                className={cls.menuItem}
                {...(isFunction(item.onClick)
                  ? {
                      selected: item.selected,
                      disabled: item.disabled,
                      component: 'button',
                      onClick: (e) => {
                        item.onClick(e);
                        close();
                      },
                    }
                  : {
                      disabled: item.disabled,
                      component: Link,
                      onClick: close,
                      to: item.to || '/',
                    })}
              >
                {item.checked && <CheckIcon />}
                {item.element}
                {t(item.label)}
              </MenuItem>
            </li>
          ),
        )}
      </Element>
    </>
  );
};

DropdownMenu.defaultProps = {
  id: undefined,
};

DropdownMenu.propTypes = {
  id: PropTypes.string,
  children: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
      to: PropTypes.string,
    }),
  ).isRequired,
};

export default DropdownMenu;
