import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { connect, Formik, Form } from 'formik';
import JSONPretty from 'react-json-pretty';
import { get } from 'lodash';
import withWrapper from './wrapper';
import { getFieldNames, intersects } from '../helpers';

export const Fieldset = ({ children }) => (
  <fieldset
    style={{
      border: 0,
      padding: 0,
      margin: 0,
    }}
  >
    {children}
  </fieldset>
);

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
};

export const FormikDebug = connect(
  ({ show, formik: { values, errors } }) =>
    show ? <JSONPretty data={{ values, errors }} /> : null,
);

const MultiFormStepper = connect(
  ({
    activeStep,
    isNew,
    steps = [],
    children,
    onClickHandler,
    formik: { errors },
  }) => {
    const { t } = useTranslation('titles');

    const generateStepProps = (child, i) => ({
      index: i,
      renderer: child,
      name: get(child, 'props.name'),
      error: intersects(
        Object.keys(errors),
        getFieldNames(
          get(child, 'props.children', []),
          'Field',
        ),
      ),
      ...(!isNew && {
        style: { cursor: 'pointer' },
        onClick: onClickHandler(i),
      }),
    });

    return (
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
      >
        {steps
          .map(generateStepProps)
          .map((stepProps, index) => (
            <Step key={index}>
              <StepLabel {...stepProps}>
                {t(stepProps.name.toLowerCase())}
              </StepLabel>
              <StepContent>
                {stepProps.renderer}
                {children(stepProps)}
              </StepContent>
            </Step>
          ))}
      </Stepper>
    );
  },
);

export default withWrapper(
  ({
    children,
    onSubmit,
    onReset,
    formikProps,
    cleanup,
    isNew,
    debug,
  }) => {
    const { t } = useTranslation('labels');
    const childrenArray = React.Children.toArray(children);
    const [activeStep, setActiveStep] = React.useState(0);

    const isLast = (v) => v >= childrenArray.length - 1;

    const processReset = React.useCallback(
      () =>
        activeStep === 0
          ? onReset()
          : setActiveStep(activeStep - 1),
      [activeStep],
    );

    const processSubmit = React.useCallback(
      (fn) => () =>
        isLast(activeStep)
          ? fn()
          : new Promise((resolve) => {
              setActiveStep(activeStep + 1);
              resolve();
            }),
      [activeStep],
    );

    const getBackLabel = (i) =>
      t(i === 0 ? 'reset' : 'back');

    const getNextLabel = (i) =>
      t(isLast(i) ? 'save' : 'next');

    return (
      <Formik
        {...formikProps}
        onSubmit={(values, actions) =>
          onSubmit(values, actions).then(() => {
            if (!cleanup) return;
            setActiveStep(0);
            actions.resetForm();
          })
        }
      >
        {({ submitForm }) => (
          <Form>
            <MultiFormStepper
              isNew={isNew}
              steps={childrenArray}
              activeStep={activeStep}
              onClickHandler={(v) => () => setActiveStep(v)}
            >
              {({ index }) => (
                <Box mt={1}>
                  <Button onClick={processReset}>
                    {getBackLabel(index)}
                  </Button>
                  <Button
                    onClick={processSubmit(submitForm)}
                    variant="contained"
                    color="primary"
                  >
                    {getNextLabel(index)}
                  </Button>
                </Box>
              )}
            </MultiFormStepper>
            <FormikDebug show={debug} />
          </Form>
        )}
      </Formik>
    );
  },
);
