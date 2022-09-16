import React from 'react';
import { Link } from '@reach/router';
import { List, ListItem } from '@material-ui/core';
import Sortable from 'sortablejs';
import { map, size } from 'lodash';
import SegmentListItem from '../SegmentListItem';
import SegmentListItemLink from '../SegmentListItemLink';

const SegmentList = ({ label = 'top', segments }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current)
      // eslint-disable-next-line
      new Sortable(ref.current, {
        group: {
          name: label,
          pull: true,
          put: true,
        },
      });
  }, []);

  // if not in debug mode AND doesn't contain that item.

  return size(segments) ? (
    <List ref={ref}>
      {map(segments, (segment) =>
        size(segment?.segments) ? (
          <SegmentListItem {...segment}>
            <SegmentList {...segment} />
          </SegmentListItem>
        ) : (
          <SegmentListItemLink {...segment} />
        ),
      )}
      <ListItem component="li" button>
        <small>More</small>
      </ListItem>
    </List>
  ) : null;
};

export default SegmentList;
