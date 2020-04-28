/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Close from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';

const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  skipProps,
  size,
  isLastStep,
}) => {
  const { t } = useTranslation();

  return (
    <Paper {...tooltipProps}>
      <Box p={1} width={450} position="relative">
        <Box position="absolute" top=".5rem" right=".5rem">
          <IconButton size="small" {...closeProps}>
            <Close />
          </IconButton>
        </Box>
        <MobileStepper
          steps={size}
          position="static"
          variant="text"
          activeStep={index}
          style={{ fontSize: '0.799rem' }}
        />
        {step.title && (
          <Typography variant="h5">
            {t(`titles:${step.title}`)}
          </Typography>
        )}
        {step.content && (
          <Typography>
            {t(`descriptions:${step.content}`)}
          </Typography>
        )}
        {isLastStep ? (
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                {...primaryProps}
                variant="contained"
                color="secondary"
              >
                {t('labels:done')}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="space-between">
            <Grid item>
              <Button {...skipProps}>
                {t('labels:skip')}
              </Button>
            </Grid>
            <Grid item>
              {index > 0 && (
                <Button
                  {...backProps}
                  style={{ marginRight: '0.25rem' }}
                >
                  {t('labels:back')}
                </Button>
              )}
              {continuous && (
                <Button
                  {...primaryProps}
                  variant="contained"
                  color="secondary"
                >
                  {t('labels:next')}
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

Tooltip.propTypes = {
  continuous: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  backProps: PropTypes.object.isRequired,
  closeProps: PropTypes.object.isRequired,
  skipProps: PropTypes.object.isRequired,
  primaryProps: PropTypes.object.isRequired,
  tooltipProps: PropTypes.object.isRequired,
};

export default Tooltip;
