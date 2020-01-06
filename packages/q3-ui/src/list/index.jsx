import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useOpen from 'useful-state/lib/useOpen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/MoreVert';
import Avatar from '../avatar';
import { DropDownMenu } from '../toolbar';

const extractStringValue = (v) =>
  Array.isArray(v) ? v.join(', ') : String(v || '--');

const ListItemIcon = ({ icon }) =>
  icon ? (
    <ListItemAvatar>
      <Avatar icon={icon} />
    </ListItemAvatar>
  ) : null;

ListItemIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
};

ListItemIcon.defaultProps = {
  icon: null,
};

const ListItemActions = ({ actions }) =>
  actions.length ? (
    <ListItemSecondaryAction>
      <DropDownMenu items={actions}>
        {(open) => (
          <IconButton onClick={open}>
            <Apps />
          </IconButton>
        )}
      </DropDownMenu>
    </ListItemSecondaryAction>
  ) : null;

ListItemActions.propTypes = {
  actions: PropTypes.arrayOf({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }),
};

ListItemActions.defaultProps = {
  actions: [],
};

const InteractiveListItem = ({
  id,
  icon,
  primary,
  secondary,
  updateOne,
  deleteOne,
  data,
  ...etc
}) => {
  const actions = [];
  const editorOpenState = useOpen();
  const confirmationOpenState = useOpen();
  const { t } = useTranslation();

  if (updateOne)
    actions.push({
      onClick: editorOpenState.open,
      label: t('labels:edit'),
    });

  if (deleteOne)
    actions.push({
      onClick: confirmationOpenState.open,
      label: t('labels:delete'),
    });

  return (
    <ListItem disableGutters key={id} component="li" dense>
      <ListItemIcon icon={icon} />
      <ListItemActions actions={actions} />
      <ListItemText
        primary={extractStringValue(primary)}
        secondary={secondary}
      />
    </ListItem>
  );
};

const Listing = ({ items, subtitle, ...rest }) => (
  <List
    subheader={
      subtitle && (
        <ListSubheader component="li" id={subtitle}>
          {subtitle}
        </ListSubheader>
      )
    }
  >
    {items.map((item) => (
      <InteractiveListItem
        {...item}
        {...rest}
        data={item}
      />
    ))}
  </List>
);

Listing.propTypes = {
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      primary: PropTypes.string,
      secondary: PropTypes.string,
    }),
  ),
};

Listing.defaultProps = {
  items: [],
  subtitle: '',
};

export default Listing;
