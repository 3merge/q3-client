import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { useAuth } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import Avatar from '../Avatar';
import Dialog from '../Dialog';

// why is this here?
export const clearHtml = () => {
  try {
    if (typeof window !== 'undefined')
      document.querySelector('.ql-editor').innerHTML =
        '<p></p>';
  } catch (e) {
    // noop
  }
};

const Create = ({ children, ...rest }) => {
  const { collectionName } = rest;
  const auth = useAuth(collectionName);
  const { HideByField } = auth;
  const { t } = useTranslation('labels');

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {children}
      </Grid>
      <HideByField op="Create" path="comments">
        <Grid item>
          <Avatar {...auth?.state?.profile} />
        </Grid>
        <Grid item xs>
          <Dialog
            {...rest}
            isNew
            renderTrigger={(onClick) => (
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
                {t('leaveAComment')}
              </Button>
            )}
            restart
          />
        </Grid>
      </HideByField>
    </Grid>
  );
};

Create.defaultProps = {
  additionalFields: null,
  children: null,
};

Create.propTypes = {
  additionalFields: PropTypes.node,
  children: PropTypes.node,
};

export default Create;
