import React from 'react';
import PropTypes from 'prop-types';
import { COLLAPSED, RAILED, STACKED } from '../constants';
import DesktopPaper from '../DesktopPaper';
import MenuSystemContext, {
  contextDefaults,
} from '../MenuSystemContext';
import MenuSystemCollapsed from '../MenuSystemCollapsed';
import MenuSystemRailed from '../MenuSystemRailed';
import MobileDrawer from '../MobileDrawer';
import usePaperWidth from '../usePaperWidth';

const MenuSystem = ({
  pages,
  height,
  variant,
  ...props
}) => {
  const width = usePaperWidth(variant);
  const MenuSystemVariant = React.useMemo(() => {
    const SelectedMenuSystemVariant = {
      [COLLAPSED]: MenuSystemCollapsed,
      [RAILED]: MenuSystemRailed,
      [STACKED]: MenuSystemRailed,
    }[variant];

    return SelectedMenuSystemVariant ? (
      <SelectedMenuSystemVariant pages={pages} />
    ) : null;
  }, [pages, variant]);

  return (
    <MenuSystemContext.Provider value={props}>
      <DesktopPaper height={height} width={width}>
        {MenuSystemVariant}
      </DesktopPaper>
      <MobileDrawer>{MenuSystemVariant}</MobileDrawer>
    </MenuSystemContext.Provider>
  );
};

MenuSystem.defaultProps = {
  ...contextDefaults,
  height: '100vh',
  pages: [],
  variant: STACKED,
};

MenuSystem.propTypes = {
  height: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      href: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
      ]),
      label: PropTypes.string,
      // eslint-disable-next-line
      pages: PropTypes.array,
    }),
  ),
  variant: PropTypes.oneOf([COLLAPSED, RAILED, STACKED]),
};

export default MenuSystem;
