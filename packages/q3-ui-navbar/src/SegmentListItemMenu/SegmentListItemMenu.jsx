import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';

const SegmentListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');

  return (
    <Menu
      id="sub-$id}"
      items={[
        {
          label: 'Administrator',
        },
        {
          label: 'Something else',
        },
        {
          label: 'Sales',
        },
      ]}
    >
      {({ open }) => (
        <Menu
          id={id}
          items={[
            { label: t('addSegmentToFolder') },
            { label: t('addFolderToFolder') },
            { label: t('renameFolder') },
            { label: t('deleteFolder') },
            {
              label: t('op'),
              onMouseDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
              },
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                open(e);
              },
              nest: true,
            },
          ]}
        >
          {(menuProps) =>
            children({
              ...menuProps,
            })
          }
        </Menu>
      )}
    </Menu>
  );
};

SegmentListItemMenu.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SegmentListItemMenu;
