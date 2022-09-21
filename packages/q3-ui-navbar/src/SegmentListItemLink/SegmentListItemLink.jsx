import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { ListItem } from '@material-ui/core';
import SegmentListItemLinkMenu from '../SegmentListItemLinkMenu';
import useStyle from './styles';

const SegmentListItemLink = ({
  applied,
  collectionName,
  id,
  label,
  value,
  ...rest
}) => {
  const cls = useStyle({
    applied,
  });

  return value ? (
    <SegmentListItemLinkMenu
      {...rest}
      collectionName={collectionName}
      id={id}
    >
      {({ open: onContextMenu }) => (
        <li data-segment id={id}>
          <ListItem
            onContextMenu={onContextMenu}
            className={cls.link}
            component={Link}
            /** @TODO */
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
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SegmentListItemLink;
