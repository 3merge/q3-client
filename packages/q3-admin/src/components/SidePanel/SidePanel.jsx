import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash/fp';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { SwapHorizontalCircle } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import { browser } from 'q3-ui-helpers';
import useGlobalStyle from '../useStyle';
import useStyle from './useStyle';
import SidePanelMobile from '../SidePanelMobile';

const SIDE_PANEL_VISIBILITY = 'sidePanelVisibility';

export const truthy = (x) =>
  typeof x === 'string'
    ? x === 'true'
    : Boolean(x) && !isNil(x);

const SidePanel = ({ id, children }) => {
  const prevState = browser.proxyLocalStorageApi(
    'getItem',
    SIDE_PANEL_VISIBILITY,
  );

  const [state, setState] = React.useState(
    !isNil(prevState) ? truthy(prevState) : true,
  );

  const toggleSidePanel = () =>
    setState((cur) => {
      const newState = !cur;
      browser.proxyLocalStorageApi(
        'setItem',
        SIDE_PANEL_VISIBILITY,
        newState,
      );

      return newState;
    });

  const globalStyle = useGlobalStyle();
  const cls = useStyle({ state });

  return (
    <div id={id}>
      <Hidden mdDown>
        <Box position="relative">
          <Box
            aria-label="expand"
            tabIndex={-1}
            role="button"
            id="sidepanel-toggle"
            onClick={toggleSidePanel}
            className={classnames(
              globalStyle.fillViewportHeight,
              cls.drawerBtn,
            )}
          >
            <SwapHorizontalCircle className={cls.icon} />
          </Box>
          <Box className={cls.root}>
            <Grid
              style={{ overflowX: 'hidden' }}
              className={globalStyle.fillViewportHeight}
              item
            >
              <Box
                component="aside"
                className={cls.scroller}
              >
                {children}
              </Box>
            </Grid>
          </Box>
        </Box>
      </Hidden>
      <SidePanelMobile>{children}</SidePanelMobile>
    </div>
  );
};

SidePanel.defaultProps = {
  id: undefined,
};

SidePanel.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

export default SidePanel;
