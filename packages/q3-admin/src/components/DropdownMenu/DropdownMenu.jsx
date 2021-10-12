import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { isFunction, map } from 'lodash';
import { useOpen } from 'useful-state';
import useStyle from './styles';

const DropdownMenu = ({ id, children, items, ...etc }) => {
  const { t } = useTranslation('labels');
  const { isOpen, anchorEl, close, open } = useOpen();
  const cls = useStyle();

  return (
    <>
      {children(open, isOpen)}
      <Menu
        id={id}
        anchorEl={anchorEl}
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
                      component: 'button',
                      onClick: (e) => {
                        item.onClick(e);
                        close();
                      },
                    }
                  : {
                      component: Link,
                      onClick: close,
                      to: item.to || '/',
                    })}
              >
                {item.element}
                {t(item.label)}
              </MenuItem>
            </li>
          ),
        )}
      </Menu>
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