import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import useSegmentsUpdate from '../useSegmentsUpdate';

const SegmentListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');
  const { addSegment, addSegmentFolder } =
    useSegmentsUpdate();

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('addSegmentToFolder'),
          onClick() {
            addSegment(id);
          },
        },
        {
          label: t('addFolderToFolder'),
          onClick() {
            addSegmentFolder(id);
          },
        },
        { label: t('renameFolder') },
        { label: t('deleteFolder') },
      ]}
    >
      {(menuProps) =>
        children({
          ...menuProps,
        })
      }
    </Menu>
  );
};

SegmentListItemMenu.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SegmentListItemMenu;
