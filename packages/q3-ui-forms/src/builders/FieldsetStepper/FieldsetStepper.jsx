import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { get } from 'lodash';
import { array } from 'q3-ui-helpers';

import { BuilderState } from '../../FormsContext';
import Field from '../Field/Field';

const { condense, hasLength, intersects } = array;

export const getFieldNames = (c, prefix) =>
  React.Children.toArray(c).reduce((curr, el) => {
    const {
      type,
      props: { children, name, group, contains = [] },
    } = el;

    // allows us to watch fields rendered inside other custom components
    if (hasLength(contains)) curr.push(contains);

    if (
      name &&
      type === React.createElement(Field, el.props).type
    )
      curr.push(prefix ? `${prefix}.$.${name}` : name);

    if (children) curr.push(getFieldNames(children, group));
    return condense(curr);
  }, []);

export const checkFieldComponentsForErrors = (
  Component,
  errors = {},
) =>
  hasLength(
    intersects(
      errors ? Object.keys(errors) : {},
      getFieldNames(get(Component, 'props.children', [])),
    ),
  );

const FieldsetStepper = ({
  activeStep,
  onClickHandler,
  children,
  steps,
}) => {
  const { t } = useTranslation('titles');
  const { errors } = React.useContext(BuilderState);

  return (
    <Stepper orientation="vertical" activeStep={activeStep}>
      {steps
        .map((child, i) => ({
          index: i,
          style: { cursor: 'pointer' },
          onClick: onClickHandler(i),
          error: Boolean(
            checkFieldComponentsForErrors(
              child.component,
              errors,
            ),
          ),
          ...child,
        }))
        .map((stepProps, index) => (
          <Step key={index}>
            <StepLabel {...stepProps}>
              {t(stepProps.name)}
            </StepLabel>
            <StepContent
              TransitionProps={{
                unmountOnExit: false,
                mountOnEnter: false,
              }}
            >
              <div>
                {stepProps.component}
                {children(stepProps)}
              </div>
            </StepContent>
          </Step>
        ))}
    </Stepper>
  );
};

FieldsetStepper.defaultProps = {
  activeStep: 0,
  steps: [],
};

FieldsetStepper.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      component: PropTypes.object,
    }),
  ),
  children: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default FieldsetStepper;
