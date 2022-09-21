import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import useSegmentsUpdate from '../useSegmentsUpdate';

const NavbarListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');
  const { addSegment, addSegmentFolder } =
    useSegmentsUpdate();

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('addSegment'),
          onClick() {
            addSegment(null);
          },
        },
        {
          label: t('addSegmentFolder'),
          onClick() {
            addSegmentFolder(null);
          },
        },
      ]}
    >
      {children}
    </Menu>
  );
};

NavbarListItemMenu.propTypes = {
  children: PropTypes.func.isRequired,
};

export default NavbarListItemMenu;
