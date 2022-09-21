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

  const handleClick = (fn) => () => fn(id);

  return (
    <SegmentListItemLinkMenuVisibility
      {...rest}
      id={id}
      items={[
        {
          label: t('rename'),
          onClick: handleClick(rename),
        },
        {
          label: t('replace'),
          onClick: handleClick(replace),
        },
        {
          label: t('delete'),
          onClick: handleClick(remove),
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
  id: PropTypes.string.isRequired,
};

export default SegmentListItemLinkMenu;
