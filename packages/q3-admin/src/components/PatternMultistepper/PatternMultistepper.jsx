import React from 'react';
import PropTypes from 'prop-types';
import {
  Stepper,
  Step,
  StepButton,
  StepContent,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import Pattern from '../Pattern';
import { connect } from '../../containers';
import useStyle from './styles';
import useMultistepper from '../../hooks/useMultistepper';

export const PatternMultistepper = ({
  data,
  getCurrentStep,
  steps,
  size,
  ...props
}) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const { getStepProps, value } =
    useMultistepper(getCurrentStep);

  return Array.isArray(steps) ? (
    <Pattern height="auto" size={size} {...props}>
      <Stepper
        activeStep={value}
        className={cls.stepper}
        orientation="vertical"
        nonLinear
      >
        {steps.map(
          (
            { label: step, component: Component, disabled },
            stepValue,
          ) => {
            const s = getStepProps(stepValue);

            return (
              <Step key={step} value={stepValue}>
                <StepButton
                  className={cls.button}
                  completed={s.completed}
                  data-completed={s.completed}
                  disabled={s.disabled || disabled}
                  onClick={s.onClick}
                >
                  {t(step)}
                </StepButton>
                <StepContent className={cls.content}>
                  <Component />
                </StepContent>
              </Step>
            );
          },
        )}
      </Stepper>
    </Pattern>
  ) : null;
};

PatternMultistepper.defaultProps = {
  size: 'xl',
};

PatternMultistepper.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
  getCurrentStep: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.element,
      value: PropTypes.number,
    }),
  ).isRequired,
  size: PropTypes.string,
};

export default connect(PatternMultistepper);
