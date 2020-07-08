import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Dialog from 'q3-ui-dialog';
import Paper from '@material-ui/core/Paper';
import useStyle from './useStyle';

const SidePanel = ({ children }) => {
  const cls = useStyle();
  return (
    <>
      <Hidden smDown>
        <Grid item className={cls.root}>
          <Paper className={cls.scroller}>{children}</Paper>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Dialog
          renderContent={() => children}
          renderTrigger={(onClick) => (
            <button type="button" onClick={onClick} />
          )}
        />
      </Hidden>
    </>
  );
};

export default SidePanel;
