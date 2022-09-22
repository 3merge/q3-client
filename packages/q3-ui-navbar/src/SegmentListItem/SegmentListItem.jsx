import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';
import ListItemArrow from '../ListItemArrow';
import SegmentListItemMenu from '../SegmentListItemMenu';
import useToggleWithSegmentState from '../useToggleWithSegmentState';
import useStyle from './styles';

const SegmentListItem = (props) => {
  const { toggle, state } =
    useToggleWithSegmentState(props);
  const { applied, children, label, id } = props;

  const cls = useStyle({
    applied,
    state,
  });

  return (
    <SegmentListItemMenu id={id}>
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
          <div className={cls.container}>{children}</div>
        </li>
      )}
    </SegmentListItemMenu>
  );
};

SegmentListItem.defaultProps = {
  applied: false,
  children: null,
};

SegmentListItem.propTypes = {
  applied: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SegmentListItem;
