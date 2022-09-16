import React from 'react';
import { Link } from '@reach/router';
import { ListItem } from '@material-ui/core';
import SegmentListItemLinkMenu from '../SegmentListItemLinkMenu';

const SegmentListItemLink = ({ applied, label, value }) => (
  <SegmentListItemLinkMenu>
    {({ open: onContextMenu }) => (
      <ListItem
        onContextMenu={onContextMenu}
        component={Link}
        /** @TODO */
        to={`/shows${value}`}
        style={{
          color: applied ? 'red' : 'inherit',
        }}
      >
        {label}
      </ListItem>
    )}
  </SegmentListItemLinkMenu>
);

export default SegmentListItemLink;
