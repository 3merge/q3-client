import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Drawer from 'q3-ui-dialog';

const SidebarDrawer = ({ children }) => {
  const { t } = useTranslation('labels');

  return (
    <Drawer
      title="Context menu"
      variant="drawer"
      renderTrigger={(onClick, isOpened) => (
        <Hidden mdUp>
          <Box
            position="fixed"
            bottom="6rem"
            right="1rem"
            zIndex={1000}
          >
            <Fab
              onClick={onClick}
              color="secondary"
              size="large"
              aria-label={isOpened ? t('close') : t('more')}
            >
              <MoreVertIcon />
            </Fab>
          </Box>
        </Hidden>
      )}
      renderContent={() => children}
    >
      {children}
    </Drawer>
  );
};

SidebarDrawer.propTypes = {
  /**
   * Displays in the first tab, underneath the standard meta information.
   */
  children: PropTypes.node.isRequired,
};

export default SidebarDrawer;
