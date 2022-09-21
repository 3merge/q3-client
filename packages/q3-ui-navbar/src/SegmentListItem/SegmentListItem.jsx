import React from 'react';
import { ListItem } from '@material-ui/core';
import ListItemArrow from '../ListItemArrow';
import SegmentListItemMenu from '../SegmentListItemMenu';
import useToggleWithSegmentState from '../useToggleWithSegmentState';
import useStyle from './styles';

const SegmentListItem = (props) => {
  const { applied, collectionName, children, label, id } =
    props;
  const { toggle, state } =
    useToggleWithSegmentState(props);

  const cls = useStyle({
    applied,
    state,
  });

  return (
    <SegmentListItemMenu
      collectionName={collectionName}
      id={id}
    >
      {({ open: onContextMenu }) => (
        <li data-segment id={id}>
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
