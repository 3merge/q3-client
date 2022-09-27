import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import useSegmentsUpdate from '../useSegmentsUpdate';
import { curry } from '../utils';

const NavbarListItemMenu = ({ children, id }) => {
  const { t } = useTranslation('labels');
  const { add, addFolder } = useSegmentsUpdate();

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('addSegment'),
          onClick: curry(add, null),
        },
        {
          label: t('addSegmentFolder'),
          onClick: curry(addFolder, null),
        },
      ]}
    >
      {children}
    </Menu>
  );
};

NavbarListItemMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default NavbarListItemMenu;
