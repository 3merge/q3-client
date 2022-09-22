import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import { includes, size } from 'lodash';
import useSegmentsUpdate from '../useSegmentsUpdate';
import SegmentsContext from '../SegmentsContext';
import Menu from '../Menu';

const SegmentListItemLinkMenu = ({
  children,
  id,
  items,
  visibility,
}) => {
  const { t } = useTranslation('labels');
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

  return size(visibilityOptions) > 0 ? (
    <Menu
      id={`visibility-options-${id}`}
      items={visibilityOptions.map((label) => ({
        checked: includes(visibility, label),
        label,
        onClick: handleEvt(handleSelect(label)),
        onMouseDown: handleEvt(),
      }))}
    >
      {({ open }) =>
        children(
          items.concat({
            label: t('visibility'),
            // already suppresses default events
            onClick: open,
            onMouseDown: handleEvt(),
            nested: true,
          }),
        )
      }
    </Menu>
  ) : (
    children(items)
  );
};

SegmentListItemLinkMenu.defaultProps = {
  items: [],
  visibility: [],
};

SegmentListItemLinkMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  visibility: PropTypes.arrayOf(PropTypes.string),
};

export default SegmentListItemLinkMenu;
