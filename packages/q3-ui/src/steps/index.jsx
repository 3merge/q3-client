import React from 'react';
import { Link } from '@reach/router';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import { LocationMatch } from '../tabs';

const Steps = ({ root, steps }) => (
  <LocationMatch base={root} views={steps}>
    {(value) => (
      <Stepper activeStep={value}>
        {steps.map(({ label, icon: Icon, to }) => (
          <Step key={label}>
            <StepButton component={Link} to={to}>
              <StepLabel StepIconComponent={Icon}>
                {label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    )}
  </LocationMatch>
);

export default Steps;
