import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { Builders } from 'q3-ui-forms';
import Dialog from 'q3-ui-dialog';
import { useAuth } from 'q3-ui-permissions';
import { useTranslation } from 'react-i18next';
import Avatar from '../Avatar';
import FieldMessage from '../FieldMessage';

export const clearHtml = () => {
  try {
    if (typeof window !== 'undefined')
      document.querySelector('.ql-editor').innerHTML =
        '<p></p>';
  } catch (e) {
    // noop
  }
};

// AUTH HERE
const Create = ({
  additionalFields,
  children,
  onSubmit,
  ...rest
}) => {
  const { collectionName } = rest;
  const auth = useAuth(collectionName);
  const { HideByField } = auth;
  const { t } = useTranslation('labels');

  return (
    <Dialog
      title="comment"
      renderTrigger={(onClick) => (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {children}
          </Grid>
          <HideByField op="Create" path="comments">
            <Grid item>
              <Avatar {...auth?.state?.profile} />
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
                {t('leaveAComment')}
              </Button>
            </Grid>
          </HideByField>
        </Grid>
      )}
      renderContent={(close) => (
        <Builders.Form
          restart
          isNew
          onSubmit={(args) =>
            onSubmit(args).then(() => {
              clearHtml();
              close();
            })
          }
        >
          <FieldMessage {...rest} />
          {additionalFields}
        </Builders.Form>
      )}
    />
  );
};

Create.defaultProps = {
  additionalFields: null,
  children: null,
};

Create.propTypes = {
  additionalFields: PropTypes.node,
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
};

export default Create;
