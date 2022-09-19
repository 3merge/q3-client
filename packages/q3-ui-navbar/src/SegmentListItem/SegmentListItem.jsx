import React from 'react';
import { ListItem } from '@material-ui/core';
import ListItemArrow from '../ListItemArrow';
import SegmentListItemMenu from '../SegmentListItemMenu';
import useToggleWithSegmentState from '../useToggleWithSegmentState';
import useStyle from './styles';

const SegmentListItem = (props) => {
  const { applied, children, label } = props;
  const { toggle, state } =
    useToggleWithSegmentState(props);

  const cls = useStyle({
    applied,
    state,
  });

  return (
    <SegmentListItemMenu id={label}>
      {({ open: onContextMenu }) => (
        <li>
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
            {label}
            <ListItemArrow state={state} />
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
