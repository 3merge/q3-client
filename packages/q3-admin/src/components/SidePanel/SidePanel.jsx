import React from 'react';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import IconButton from 'q3-ui/lib/iconButton';
import AppsIcon from '@material-ui/icons/Apps';
import Hidden from '@material-ui/core/Hidden';
import Dialog from 'q3-ui-dialog';
import Box from '@material-ui/core/Box';
import useGlobalStyle from '../useStyle';
import useStyle from './useStyle';

const SidePanel = ({ id, children }) => {
  const globalStyle = useGlobalStyle();
  const cls = useStyle();

  return (
    <div id={id}>
      <Hidden smDown>
        <Grid
          id="q3-sidebar"
          component="section"
          item
          className={classnames(
            globalStyle.fillViewportHeight,
            cls.root,
          )}
        >
          <Box className={cls.scroller}>{children}</Box>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Dialog
          title="options"
          renderContent={() => children}
          renderTrigger={(onClick) => (
            <Box
              position="absolute"
              top="-65px"
              left="45px"
              display="flex"
              alignItems="center"
              height="65px"
            >
              <IconButton
                label="options"
                icon={AppsIcon}
                buttonProps={{ onClick }}
              />
            </Box>
          )}
        />
      </Hidden>
    </div>
  );
};

export default SidePanel;
