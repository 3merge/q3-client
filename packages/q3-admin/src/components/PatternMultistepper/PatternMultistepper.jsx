import React from 'react';
import PropTypes from 'prop-types';
import {
  Stepper,
  Step,
  StepButton,
  StepContent,
} from '@material-ui/core';
import { AuthContext } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import { isFunction } from 'lodash';
import Pattern from '../Pattern';
import { connect } from '../../containers';
import useStyle from './styles';

const PatternMultistepper = ({
  data,
  getCurrentStep,
  steps,
  size,
  ...props
}) => {
  const cls = useStyle();
  const user =
    React.useContext(AuthContext)?.state?.profile;

  const defaultValue = isFunction(getCurrentStep)
    ? getCurrentStep(data, user)
    : 0;

  const [value, setValue] = React.useState(defaultValue);
  const { t } = useTranslation('labels');

  const handleStep = (nextValue) => (e) => {
    e.preventDefault();
    setValue(nextValue);
  };

  const getCompleted = (nextValue) =>
    defaultValue > nextValue;

  const getDisabled = (nextValue) =>
    defaultValue < nextValue;

  React.useEffect(() => {
    setValue(getCurrentStep(data));
  }, [data]);

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
          ) => (
            <Step
              key={step}
              value={stepValue}
              style={{
                // css rule on button not working
                cursor: disabled
                  ? 'not-allowed'
                  : undefined,
              }}
            >
              <StepButton
                className={cls.button}
                data-completed={getCompleted(stepValue)}
                completed={getCompleted(stepValue)}
                disabled={
                  getDisabled(stepValue) || disabled
                }
                onClick={handleStep(stepValue)}
              >
                {t(step)}
              </StepButton>
              <StepContent className={cls.content}>
                <Component />
              </StepContent>
            </Step>
          ),
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
