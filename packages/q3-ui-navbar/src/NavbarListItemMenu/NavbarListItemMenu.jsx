import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Menu from '../Menu';
import SegmentsContext from '../SegmentsContext';

const NavbarListItemMenu = ({ children, id }) => {
  const { enabled } = React.useContext(SegmentsContext);
  const [useEditor, setUseEditor] = React.useState();
  const { t } = useTranslation('labels');

  const closeEditor = () => {
    useEditor(false);
  };

  return (
    <Menu
      id={id}
      items={[
        {
          label: t('addSegment'),
          description: t('descriptions:addSegment'),
        },
        {
          label: t('addSegmentFolder'),
          description: t('descriptions:addSegmentFolder'),
        },
        {
          label: t('reorderSegments'),
          description: t('descriptions:reorderSegments'),
          onClick() {
            setUseEditor((prevState) => !prevState);
          },
        },
      ]}
    >
      {(menuProps) =>
        children({
          ...menuProps,
          closeEditor,
          useEditor,
        })
      }
    </Menu>
  );
};

NavbarListItemMenu.propTypes = {
  children: PropTypes.func.isRequired,
};

export default NavbarListItemMenu;
