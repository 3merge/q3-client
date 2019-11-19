import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { MultiStepFormik } from '../wizard';

const VerticalWizard = ({
  getContent,
  steps,
  title,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <MultiStepFormik {...rest} steps={steps}>
      {({
        activeStep,
        isFirst,
        isLast,
        back,
        next,
        ...etc
      }) => (
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((ActiveStep, index) => (
            <Step key={index} {...etc}>
              {getContent && (
                <StepLabel>
                  {t(`titles:${getContent(index)}`)}
                </StepLabel>
              )}
              <StepContent>
                {getContent && (
                  <Typography>
                    {t(`descriptions:${getContent(index)}`)}
                  </Typography>
                )}
                <ActiveStep />
                <div>
                  <Button disabled={isFirst} onClick={back}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={next}
                  >
                    {isLast ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
    </MultiStepFormik>
  );
};

export default VerticalWizard;
