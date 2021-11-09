import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import ListItemMui from '@material-ui/core/ListItem';
import ListItemTextMui from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '../../../avatar';
import { formatArrayAsCommaDelineatedString } from '../../utils';

export const ListItem = ({
  id,
  children,
  title,
  description,
  icon: Icon,
  renderListItemProps,
  href,
}) => {
  const primary = formatArrayAsCommaDelineatedString(title);
  const secondary = formatArrayAsCommaDelineatedString(
    description,
  );

  return (
    <ListItemMui
      id={id}
      disableGutters
      component="li"
      dense
    >
      <Box
        component={href ? Link : 'span'}
        to={href}
        display="flex"
        alignItems="center"
        style={{ color: 'inherit' }}
      >
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemTextMui
          style={{
            color: 'inherit',
            textDecoration: href ? 'underline' : 'none',
          }}
          primary={primary}
          secondary={secondary}
          {...(renderListItemProps
            ? renderListItemProps()
            : {})}
        />

        {children && !Array.isArray(children)
          ? React.cloneElement(children, {
              id,
            })
          : null}
      </Box>
    </ListItemMui>
  );
};

ListItem.propTypes = {
  /**
   * Used to reference the list item during interactivity.
   */
  id: PropTypes.string.isRequired,

  /**
   * If included, it should be the <ActionBar /> component.
   */
  children: PropTypes.node,

  /**
   * Configures the item's.
   */
  title: PropTypes.string.isRequired,

  /**
   * Configures the item's subtitle.
   */
  description: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,

  /**
   * An optional rendering function for dynamically inserting list props.
   */
  renderListItemProps: PropTypes.func,

  /**
   * MUI Icon to populate inner avatar Comp.
   */
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  color: PropTypes.string,
  href: PropTypes.string,
};

ListItem.defaultProps = {
  children: null,
  icon: null,
  renderListItemProps: null,
  color: '',
  href: '',
};

export default ListItem;
