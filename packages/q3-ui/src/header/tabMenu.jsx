import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Hidden from '@material-ui/core/Hidden';
import { LocationMatch } from '../tabs';
import StyledTab, { a11yProps } from './tab';
import StyledTabs from './tabs';

const Menu = ({
  items,
  menuRenderPosition,
  menuPosition,
}) =>
  menuRenderPosition === menuPosition &&
  Array.isArray(items) &&
  items.length ? (
    <Hidden smDown>
      <LocationMatch views={items} defaultIndex={null}>
        {(value) => (
          <StyledTabs
            value={value}
            aria-label="Main navigation"
            TabIndicatorProps={{ children: <div /> }}
          >
            {items.map(
              ({ to, href, visible, label }, i) => {
                const path = to || href || '/';

                return visible ? (
                  <StyledTab
                    component={Link}
                    to={path}
                    key={path}
                    label={label}
                    {...a11yProps(i)}
                  />
                ) : null;
              },
            )}
          </StyledTabs>
        )}
      </LocationMatch>
    </Hidden>
  ) : null;

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),

  menuPosition: PropTypes.string,
  menuRenderPosition: PropTypes.string,
};

Menu.defaultProps = {
  menuPosition: 'right',
  menuRenderPosition: 'right',
  items: [],
};

export default Menu;
