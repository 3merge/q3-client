import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import Sortable from 'sortablejs';
import { map, size } from 'lodash';
import SegmentListItem from '../SegmentListItem';
import SegmentListItemLink from '../SegmentListItemLink';
import useStyle from './styles';

const SegmentList = ({ label, segments, onEnd }) => {
  const ref = React.useRef();
  const cls = useStyle();

  React.useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line
      new Sortable(ref.current, {
        group: {
          name: label,
          pull: true,
          put: true,
        },
        onEnd,
      });
    }
  }, []);

  return size(segments) ? (
    <List className={cls.root} ref={ref}>
      {map(segments, (segment) =>
        size(segment?.segments) ? (
          <SegmentListItem {...segment}>
            <SegmentList onEnd={onEnd} {...segment} />
          </SegmentListItem>
        ) : (
          <SegmentListItemLink {...segment} />
        ),
      )}
    </List>
  ) : null;
};

SegmentList.defaultProps = {
  label: 'top-tier',
  segments: [],
};

SegmentList.propTypes = {
  label: PropTypes.string,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default SegmentList;
