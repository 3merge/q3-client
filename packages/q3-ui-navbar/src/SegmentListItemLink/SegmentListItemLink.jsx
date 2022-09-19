import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { ListItem } from '@material-ui/core';
import SegmentListItemLinkMenu from '../SegmentListItemLinkMenu';
import useStyle from './styles';

const SegmentListItemLink = ({ applied, label, value }) => {
  const cls = useStyle({
    applied,
  });

  return (
    <SegmentListItemLinkMenu>
      {({ open: onContextMenu }) => (
        <li>
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
  );
};

SegmentListItemLink.defaultProps = {
  applied: false,
};

SegmentListItemLink.propTypes = {
  applied: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SegmentListItemLink;
