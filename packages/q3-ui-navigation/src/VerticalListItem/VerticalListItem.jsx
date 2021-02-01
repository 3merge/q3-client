import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ListItem, Button } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(
  ({
    palette: {
      primary: { main },
    },
  }) => ({
    root: {
      borderColor: 'transparent',
      borderLeft: '3px solid',
      justifyContent: 'space-between',
      paddingLeft: '1.5rem',
      transition: 'border 250ms',
    },
    selected: {
      borderLeftColor: main,
      borderRadius: 0,
    },
  }),
);

const VerticalListItem = ({
  label,
  onClick,
  isExpanded,
  isSelected,
  children,
  role,
}) => {
  const cls = useStyle();
  const renderExpandedIcon = () => {
    if (typeof isExpanded !== 'boolean') return null;
    return isExpanded ? (
      <ExpandLess style={{}} />
    ) : (
      <ExpandMore style={{}} />
    );
  };

  return (
    <ListItem
      style={{
        display: 'block',
        margin: 0,
        padding: 0,
      }}
    >
      <Button
        color="inherit"
        onClick={onClick}
        fullWidth
        role={role || 'button'}
        className={cn([
          ...[isSelected ? cls.selected : undefined],
          cls.root,
        ])}
        style={{
          textTransform: 'none',
          alignItems: 'left',
        }}
      >
        {label}
        {renderExpandedIcon()}
      </Button>
      {isExpanded && children != null && children}
    </ListItem>
  );
};

VerticalListItem.defaultProps = {
  isSelected: false,
  role: '',
  children: null,
};

VerticalListItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  role: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  isExpanded: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  icon: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
};

export default VerticalListItem;
