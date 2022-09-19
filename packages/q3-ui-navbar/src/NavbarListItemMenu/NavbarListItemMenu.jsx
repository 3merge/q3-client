import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import SegmentsContext from '../SegmentsContext';

const NavbarListItemMenu = ({ children, id }) => {
  const { enabled } = React.useContext(SegmentsContext);
  const { t } = useTranslation('labels');

  return (
    <Menu
      id={id}
      items={[
        { label: t('addSegment') },
        { label: t('addSegmentFolder') },
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
