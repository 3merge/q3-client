import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Box, ListItem } from '@material-ui/core';
import ListItemSecondaryActionPosition from '../ListItemSecondaryActionPosition';
import SegmentListItemLinkMenu from '../SegmentListItemLinkMenu';
import useStyle from './styles';

const SegmentListItemLink = ({
  applied,
  badge,
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
      {({ className, open: onContextMenu }) => (
        <li className={className} data-id={id} data-segment>
          <ListItem
            className={cls.link}
            component={Link}
            onContextMenu={onContextMenu}
            to={value}
          >
            <Box flex="1">{label}</Box>
            <ListItemSecondaryActionPosition
              arrow={false}
              badge={badge}
            />
          </ListItem>
        </li>
      )}
    </SegmentListItemLinkMenu>
  ) : null;
};

SegmentListItemLink.defaultProps = {
  applied: false,
  badge: 0,
};

SegmentListItemLink.propTypes = {
  applied: PropTypes.bool,
  badge: PropTypes.number,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(SegmentListItemLink);
