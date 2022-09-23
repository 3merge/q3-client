import React from 'react';
import PropTypes from 'prop-types';
import { includes, size } from 'lodash';
import useSegmentsUpdate from '../useSegmentsUpdate';
import SegmentsContext from '../SegmentsContext';

const SegmentListItemLinkMenu = ({
  children,
  id,
  items,
  visibility,
}) => {
  const { visibilityOptions } =
    React.useContext(SegmentsContext);
  const { replaceVisibility } = useSegmentsUpdate();

  const handleEvt = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fn) fn(e);
  };

  const handleSelect = (label) => () => {
    replaceVisibility(
      id,
      // eslint-disable-next-line
      Array.isArray(visibility)
        ? includes(visibility, label)
          ? visibility.filter((item) => item !== label)
          : visibility.concat(label)
        : [label],
    );
  };

  return size(visibilityOptions) > 0
    ? children(
        items.concat([
          {
            divider: true,
          },
          ...visibilityOptions.map((label) => ({
            checked: includes(visibility, label),
            label,
            onClick: handleEvt(handleSelect(label)),
            onMouseDown: handleEvt(),
          })),
        ]),
      )
    : children(items);
};

SegmentListItemLinkMenu.defaultProps = {
  items: [],
  visibility: [],
};

SegmentListItemLinkMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  visibility: PropTypes.arrayOf(PropTypes.string),
};

export default SegmentListItemLinkMenu;
