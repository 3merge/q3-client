import React from 'react';
import PropTypes from 'prop-types';
import ListItemMui from '@material-ui/core/ListItem';
import ListItemTextMui from '@material-ui/core/ListItemText';
import ListItemAvatarMui from '@material-ui/core/ListItemAvatar';
import Context from '../../utils/searchContext';
import { formatArrayAsCommaDelineatedString } from '../../utils';
import Avatar from '../../../avatar';

export const ListItem = ({
  id,
  children,
  title,
  description,
  icon,
  renderListItemProps,
}) => {
  const { term } = React.useContext(Context);
  const primary = formatArrayAsCommaDelineatedString(title);
  const secondary = formatArrayAsCommaDelineatedString(
    description,
  );

  if (
    term.length &&
    !new RegExp(term, 'gi').test(primary + secondary)
  )
    return null;

  return (
    <ListItemMui
      id={id}
      disableGutters
      component="li"
      dense
    >
      {icon && (
        <ListItemAvatarMui>
          <Avatar word={primary} icon={icon} />
        </ListItemAvatarMui>
      )}
      <ListItemTextMui
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
};

ListItem.defaultProps = {
  children: null,
  icon: null,
  renderListItemProps: null,
};

export default ListItem;
