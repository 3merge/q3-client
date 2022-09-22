import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@material-ui/core';
import NavbarListItemBase from '../NavbarListItemBase';
import NavbarListItemMenu from '../NavbarListItemMenu';
import useHyphenatedId from '../useHyphenatedId';
import useNavbarListItemProps from '../useNavbarListItemProps';
import useStyle from './styles';

const NavbarListItem = ({
  children,
  enableSegments,
  label,
  segments,
  to,
  ...rest
}) => {
  const makeId = useHyphenatedId(label);
  const menuId = makeId('menu');
  const segmentId = makeId('segments');

  const renderer = React.useCallback(
    ({ open: openContextMenu }) => {
      const {
        hasSegments,
        matches,
        state,
        ...remainingNavbarListProps
      } = useNavbarListItemProps({
        enableSegments,
        menuId,
        openContextMenu,
        segmentId,
        segments,
        to,
      });

      const cls = useStyle({
        matches,
        state,
      });

      return (
        <NavbarListItemBase
          {...rest}
          {...remainingNavbarListProps}
          arrow={hasSegments}
          label={label}
          matches={matches}
          selected={state}
        >
          {hasSegments && (
            <Collapse id={segmentId} in={state}>
              <div className={cls.container}>
                {children}
              </div>
            </Collapse>
          )}
        </NavbarListItemBase>
      );
    },
    [enableSegments, label, segments, to],
  );

  return (
    <NavbarListItemMenu id={menuId}>
      {renderer}
    </NavbarListItemMenu>
  );
};

NavbarListItem.defaultProps = {
  children: null,
  enableSegments: false,
  segments: [],
};

NavbarListItem.propTypes = {
  children: PropTypes.node,
  enableSegments: PropTypes.bool,
  label: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.shape({})),
  to: PropTypes.string.isRequired,
};

export default NavbarListItem;
