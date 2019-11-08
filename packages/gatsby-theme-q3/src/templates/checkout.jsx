import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import FormBuilder from 'q3-ui-commons/lib/helpers';
import AddressSchema, {
  initialData,
} from 'q3-ui-commons/lib/schemas/address';
import { SplitPanel } from 'q3-ui/lib/panel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

/**
 * @STEPS
 * If no items in cart... display message
 * If cart has shipping/billing skip ahead
 * Get config...
 */

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    backgroundColor: '#FFF',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Location', 'Shipping', 'Payment', 'Review'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

function HorizontalLinearStepper({ children }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error(
        "You can't skip a step that isn't optional.",
      );
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">
                Optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button
              onClick={handleReset}
              className={classes.button}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {children}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1
                  ? 'Finish'
                  : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ({ children }) => {
  const {
    sitePlugin: { 
      pluginOptions: { 
        checkout, 
        guestCheckout, 
        payment, 
        shipping, 
      },
      },
    } = useStaticQuery(graphql`
    query MyQuery {
      sitePlugin {
        pluginOptions {
          checkout
          guestCheckout
          payment {
            strategy
          }
          shipping {
            flat
            strategy
          }
        }
      }
    }
  `);


  return (
    <Container component="main">
      <Box my={4}>
        <HorizontalLinearStepper>
          <SplitPanel
            columnLeft={
              <FormBuilder
                dividers={false}
                title="billingAddress"
                schema={{
                  ...AddressSchema[0],
                  ...AddressSchema[1],
                }}
                data={{
                  ...initialData[0],
                  ...initialData[1],
                }}
              />
            }
            columnRight={
              <FormBuilder
                dividers={false}
                title="shippingAddress"
                schema={{
                  ...AddressSchema[0],
                  ...AddressSchema[1],
                }}
                data={{
                  ...initialData[0],
                  ...initialData[1],
                }}
              />
            }
          />
        </HorizontalLinearStepper>
      </Box>
    </Container>
  );
};
