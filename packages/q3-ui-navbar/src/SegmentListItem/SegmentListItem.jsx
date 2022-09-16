import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SegmentListItemMenu from '../SegmentListItemMenu';
import useToggleWithSegmentState from '../useToggleWithSegmentState';
import useStyle from '../NavbarListItem/styles';

const SegmentListItem = ({ label, children, ...props }) => {
  const { toggle, state } =
    useToggleWithSegmentState(props);
  const cls = useStyle({
    state,
  });

  return (
    <SegmentListItemMenu id={label}>
      {({ open: onContextMenu }) => (
        <li>
          <ListItem
            button
            onClick={toggle}
            selected={state}
            onContextMenu={onContextMenu}
          >
            {label}
            <ListItemSecondaryAction
              className={cls.secondaryAction}
            >
              <ArrowForwardIosIcon className={cls.icon} />
            </ListItemSecondaryAction>{' '}
          </ListItem>
          <div
            style={{
              display: state ? 'block' : 'none',
            }}
          >
            {children}
          </div>
        </li>
      )}
    </SegmentListItemMenu>
  );
};

export default SegmentListItem;
