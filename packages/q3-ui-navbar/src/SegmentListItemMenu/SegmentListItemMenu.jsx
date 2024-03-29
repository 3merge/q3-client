import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import useSegmentsUpdate from '../useSegmentsUpdate';
import { curry } from '../utils';

const SegmentListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');
  const { add, addFolder, rename, remove } =
    useSegmentsUpdate();

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('addSegment'),
          onClick: curry(add, id),
        },
        {
          label: t('addFolder'),
          onClick: curry(addFolder, id),
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
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SegmentListItemMenu;
