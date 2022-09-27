import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import useSegmentsUpdate from '../useSegmentsUpdate';
import Menu from '../Menu';
import SegmentListItemLinkMenuVisibility from '../SegmentListItemLinkMenuVisibility';
import { curry } from '../utils';

const SegmentListItemLinkMenu = ({
  children,
  id,
  ...rest
}) => {
  const { remove, rename, replace } = useSegmentsUpdate();
  const { t } = useTranslation('labels');

  return (
    <SegmentListItemLinkMenuVisibility
      {...rest}
      id={id}
      items={[
        {
          label: t('rename'),
          onClick: curry(rename, id),
        },
        {
          label: t('replace'),
          onClick: curry(replace, id),
        },
        {
          label: t('delete'),
          onClick: curry(remove, id),
        },
      ]}
    >
      {(items) => (
        <Menu id={id} items={items}>
          {children}
        </Menu>
      )}
    </SegmentListItemLinkMenuVisibility>
  );
};

SegmentListItemLinkMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SegmentListItemLinkMenu;
