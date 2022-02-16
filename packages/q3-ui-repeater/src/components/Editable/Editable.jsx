import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Box,
  Popover,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import { Builders } from 'q3-ui-forms';
import { useOpen } from 'useful-state';
import { pick } from 'lodash';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'q3-ui-locale';

const Editable = ({
  label,
  name,
  initialValues,
  onSubmit,
  text,
  ...rest
}) => {
  const { open, close, anchorEl, isOpen } = useOpen();
  const { t } = useTranslation('labels');

  React.useEffect(() => close, []);

  return (
    <>
      <Box
        role="button"
        component="span"
        tabIndex={0}
        onClick={open}
        onKeyPress={open}
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
        }}
      >
        {text}
      </Box>
      <Popover
        disablePortal
        open={isOpen}
        anchorEl={anchorEl}
        onClose={close}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={1} maxWidth="80vw" width={320}>
          <Builders.Form
            {...pick(rest, [
              'collectionName',
              'isNew',
              'initialErrors',
              'debug',
              'keep',
              'marshal',
              'marshalAuthorizationContext',
              'marshalSelectively',
              'modify',
              'showSuccessMessage',
              'restart',
              'translate',
              'onReset',
              'unwind',
              'under',
            ])}
            disableChangeDetection
            enableSubmit={false}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            <Grid
              item
              xs={12}
              style={{ marginBottom: '-.5rem' }}
            >
              <Grid
                container
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="overline">
                    {t(label || name)}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="close"
                    onClick={close}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Builders.Field
              {...pick(rest, [
                'name',
                'type',
                'override',
                'under',
                'options',
                'loadOptions',
                'min',
                'max',
                'step',
                'validate',
                'freeSolo',
                'positive',
                'variant',
                'required',
                'of',
                'multiline',
                'rows',
                'runOnChange',
                'preload',
                'minimumCharacterCount',
                'initialValue',
                'disabled',
                'label',
                'onChange',
                'getOptionDisabled',
                'renderOption',
                'readOnly',
                'required',
                'freeSolo',
                'disabled',
                'maxVisible',
              ])}
              name={name}
              autoFocus
              suppressLabel
              suppressHelper
              xl={12}
              lg={12}
            />
            <Grid
              item
              xs={12}
              style={{ marginTop: '-.5rem' }}
            >
              <Button
                aria-label="save"
                startIcon={<SaveIcon />}
                type="submit"
              >
                {t('save')}
              </Button>
            </Grid>
          </Builders.Form>
        </Box>
      </Popover>
    </>
  );
};

Editable.defaultProps = {
  label: undefined,
  text: '--',
  initialValues: {},
};

Editable.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default React.memo(Editable);
