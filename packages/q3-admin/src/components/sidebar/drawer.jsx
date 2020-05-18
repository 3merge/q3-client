import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from 'q3-ui-dialog';

const SidebarDrawer = ({ children }) => {
  const { t } = useTranslation('labels');

  return (
    <Drawer
      title="Context menu"
      renderTrigger={(onClick, isOpened) => (
        <Hidden lgUp>
          <Button
            fullWidth
            type="button"
            onClick={onClick}
            variant="contained"
            size="small"
            aria-label={isOpened ? t('close') : t('more')}
            style={{
              borderRadius: 0,
            }}
          >
            Context menu
          </Button>
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
