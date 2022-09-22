import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { ListItem } from '@material-ui/core';
import SegmentListItemLinkMenu from '../SegmentListItemLinkMenu';
import useStyle from './styles';

const SegmentListItemLink = ({
  applied,
  id,
  label,
  value,
  ...rest
}) => {
  const cls = useStyle({
    applied,
  });

  return value ? (
    <SegmentListItemLinkMenu {...rest} id={id}>
      {({ open: onContextMenu }) => (
        <li data-segment id={id}>
          <ListItem
            className={cls.link}
            component={Link}
            onContextMenu={onContextMenu}
            to={value}
          >
            {label}
          </ListItem>
        </li>
      )}
    </SegmentListItemLinkMenu>
  ) : null;
};

SegmentListItemLink.defaultProps = {
  applied: false,
};

SegmentListItemLink.propTypes = {
  applied: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(SegmentListItemLink);
