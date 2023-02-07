import React from 'react';
import PropTypes from 'prop-types';
import { Box, ListItem } from '@material-ui/core';
import ListItemArrow from '../ListItemArrow';
import SegmentListItemMenu from '../SegmentListItemMenu';
import ListItemSecondaryActionPosition from '../ListItemSecondaryActionPosition';
import useToggleWithSegmentState from '../useToggleWithSegmentState';
import useStyle from './styles';

const SegmentListItem = (props) => {
  const { toggle, state } =
    useToggleWithSegmentState(props);

  const { applied, badge, children, label, id } = props;

  const cls = useStyle({
    applied,
    state,
  });

  return (
    <SegmentListItemMenu id={id}>
      {({ className, open: onContextMenu }) => (
        <li
          className={className}
          data-segment
          data-segment-folder
          data-id={id}
        >
          <ListItem
            button
            onClick={toggle}
            onContextMenu={onContextMenu}
            selected={state}
            classes={{
              root: cls.listItem,
              selected: cls.listItemSelected,
            }}
          >
            <Box flex="1">{label}</Box>
            <ListItemSecondaryActionPosition
              arrow
              badge={badge}
              state={state}
            />
          </ListItem>
          <div className={cls.container}>{children}</div>
        </li>
      )}
    </SegmentListItemMenu>
  );
};

SegmentListItem.defaultProps = {
  applied: false,
  children: null,
};

SegmentListItem.propTypes = {
  applied: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SegmentListItem;
