import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import useSegmentsUpdate from '../useSegmentsUpdate';

const SegmentListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');
  const { addSegment, addSegmentFolder, rename, remove } =
    useSegmentsUpdate();

  const handleClick = (fn) => () => fn(id);

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('addSegment'),
          onClick: handleClick(addSegment),
        },
        {
          label: t('addFolder'),
          onClick: handleClick(addSegmentFolder),
        },
        {
          label: t('rename'),
          onClick: handleClick(rename),
        },
        {
          label: t('delete'),
          onClick: handleClick(remove),
        },
      ]}
    >
      {children}
    </Menu>
  );
};

SegmentListItemMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default SegmentListItemMenu;
