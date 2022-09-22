import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import useSegmentsUpdate from '../useSegmentsUpdate';
import { curry } from '../utils';

const SegmentListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');
  const { addSegment, addSegmentFolder, rename, remove } =
    useSegmentsUpdate();

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('addSegment'),
          onClick: curry(addSegment, id),
        },
        {
          label: t('addFolder'),
          onClick: curry(addSegmentFolder, id),
        },
        {
          label: t('rename'),
          onClick: curry(rename, id),
        },
        {
          label: t('delete'),
          onClick: curry(remove, id),
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
