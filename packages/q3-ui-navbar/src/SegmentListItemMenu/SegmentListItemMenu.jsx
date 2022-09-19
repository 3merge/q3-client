import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';

const SegmentListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');

  return (
    <Menu
      id={id}
      items={[
        { label: t('addSegmentToFolder') },
        { label: t('addFolderToFolder') },
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
