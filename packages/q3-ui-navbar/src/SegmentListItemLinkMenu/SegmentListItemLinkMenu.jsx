import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';

const SegmentListItemLinkMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('renameSegment'),
        },
        {
          label: t('replaceSegment'),
          description: t('descriptions:replaceSegment'),
        },
        {
          label: t('deleteSegment'),
        },
        {
          label: t('permissions'),
        },
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

SegmentListItemLinkMenu.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SegmentListItemLinkMenu;
