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

  console.log(visibility);

  return size(visibilityOptions) ? (
    <Menu
      id={`visibility-options-${id}`}
      items={visibilityOptions.map((label) => ({
        label,
        checked: includes(visibility, label),
        onMouseDown: handleEvt(),
        onClick: handleEvt(handleSelect(label)),
      }))}
    >
      {({ open }) =>
        children(
          items.concat({
            label: t('visibility'),
            onMouseDown: handleEvt(),
            onClick: handleEvt(open),
            nested: true,
          }),
        )
      }
    </Menu>
  ) : (
    children(items)
  );
};

SegmentListItemLinkMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default SegmentListItemLinkMenu;
