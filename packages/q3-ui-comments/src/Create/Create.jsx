import React from 'react';
import { Button, Grid } from '@material-ui/core';
import Avatar from 'q3-ui/lib/avatar';
import { Builders } from 'q3-ui-forms';
import Dialog from 'q3-ui-dialog';
import { AuthContext } from 'q3-ui-permissions';
import FieldMessage from '../FieldMessage';

export default ({ children, onSubmit, ...rest }) => {
  const auth = React.useContext(AuthContext);

  return (
    <Dialog
      renderTrigger={(onClick) => (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {children}
          </Grid>
          <Grid item>
            <Avatar imgSrc={auth?.state?.profile?.photo} />
          </Grid>
          <Grid item xs>
            <Button
              disableRipple
              onClick={onClick}
              variant="outlined"
              fullWidth
              style={{
                justifyContent: 'flex-start',
                paddingBottom: '2rem',
              }}
            >
              Leave a comment
            </Button>
          </Grid>
        </Grid>
      )}
      renderContent={(close) => (
        <Builders.Form
          restart
          onSubmit={(args) =>
            onSubmit(args).then(() => {
              document.querySelector(
                '.ql-editor',
              ).innerHTML = '<p></p>';

              close();
            })
          }
        >
          <FieldMessage {...rest} />
        </Builders.Form>
      )}
    />
  );
};
