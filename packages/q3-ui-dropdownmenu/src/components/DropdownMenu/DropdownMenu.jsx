import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from '@reach/router';
import { MenuItem, Divider } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { isFunction, map } from 'lodash';
import { useOpen } from 'useful-state';
import CheckIcon from '@material-ui/icons/Check';
import { object } from 'q3-ui-helpers';
import DropdownMenuList from '../DropdownMenuList';
import useStyle from './styles';

const DropdownMenu = ({ id, children, items, ...etc }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('labels');
  const { isOpen, anchorEl, close, open } = useOpen();
  const cls = useStyle();

  return (
    <>
      {children(open, isOpen)}
      <DropdownMenuList
        id={id}
        anchorEl={anchorEl}
        anchor="bottom"
        getContentAnchorEl={null}
        open={isOpen}
        onClose={(e) => {
          object.cancelEvents(e);
          close(e);
        }}
        elevation={5}
        variant="menu"
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
            <MenuItem
              {...item}
              dense
              className={cls.menuItem}
              key={item.label}
              onClick={
                isFunction(item.onClick)
                  ? (e) => {
                      item.onClick(e);
                      close(e);
                    }
                  : (e) => {
                      navigate(item.to || '/');
                      close(e);
                    }
              }
            >
              {item.checked && <CheckIcon />}
              {item.element}
              {t(item.label)}
            </MenuItem>
          ),
        )}
      </DropdownMenuList>
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
