import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import useSegmentsUpdate from '../useSegmentsUpdate';
import Menu from '../Menu';
import SegmentListItemLinkMenuVisibility from '../SegmentListItemLinkMenuVisibility';

const SegmentListItemLinkMenu = ({
  children,
  id,
  ...rest
}) => {
  const { t } = useTranslation('labels');
  const { remove, rename, replace } = useSegmentsUpdate();

  return (
    <SegmentListItemLinkMenuVisibility
      {...rest}
      id={id}
      items={[
        {
          label: t('renameSegment'),
          onClick() {
            rename(id);
          },
        },
        {
          label: t('replaceSegment'),
          onClick() {
            replace(id);
          },
        },
        {
          label: t('deleteSegment'),
          onClick() {
            remove(id);
          },
        },
      ]}
    >
      {(items) => (
        <Menu id={id} items={items}>
          {(menuProps) =>
            children({
              ...menuProps,
            })
          }
        </Menu>
      )}
    </SegmentListItemLinkMenuVisibility>
  );
};

SegmentListItemLinkMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default SegmentListItemLinkMenu;
