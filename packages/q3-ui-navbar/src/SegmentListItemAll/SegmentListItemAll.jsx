import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';
import { Link, useMatch } from '@reach/router';
import { size, some } from 'lodash';
import useStyle from '../SegmentListItemLink/styles';

const SegmentList = ({ segments, to }) => {
  const matched = useMatch(to);
  const hasAppliedSegments = React.useMemo(() => {
    const check = (xs) => some(xs, (item) => item.applied);

    return check(segments);
  }, [segments]);

  const cls = useStyle({
    applied: matched && !hasAppliedSegments,
  });

  return (
    <ListItem
      button
      disableRipple
      className={cls.link}
      component={Link}
      to={to}
    >
      All
    </ListItem>
  );
};

SegmentList.defaultProps = {
  segments: [],
  to: '/',
};

SegmentList.propTypes = {
  to: PropTypes.string,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default SegmentList;
