import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import ListItemMui from '@material-ui/core/ListItem';
import ListItemTextMui from '@material-ui/core/ListItemText';
import ListItemAvatarMui from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { formatArrayAsCommaDelineatedString } from '../../utils';
import useStyles from './useStyles';

export const ListItem = ({
  id,
  children,
  title,
  description,
  icon: Icon,
  renderListItemProps,
  href,
  color,
}) => {
  const primary = formatArrayAsCommaDelineatedString(title);
  const secondary = formatArrayAsCommaDelineatedString(
    description,
  );
  const cls = useStyles({ listItemTextColor: color });

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
      >
        {Icon && (
          <ListItemAvatarMui>
            <Avatar style={{ backgroundColor: color }}>
              <Icon />
            </Avatar>
          </ListItemAvatarMui>
        )}
        <ListItemTextMui
          style={{
            color,
            textDecoration: href ? 'underline' : 'none',
          }}
          className={cls.listItemText}
          primaryTypograph
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
