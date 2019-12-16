import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { Formik, Form } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Container from '@material-ui/core/Container';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';

class StepReader {
  constructor(a, step = 0) {
    this.current = step;
    this.views = (Array.isArray(a) ? a : [a])
      .flat()
      .filter(Boolean);
    return this;
  }

  static getName(c) {
    return c ? c.props.name || c.type.name : '';
  }

  getValues() {
    return this.views.reduce(
      (a, c) =>
        Object.assign(a, {
          ...c.props.initialValues,
        }),
      {},
    );
  }

  getValidation() {
    return get(
      this.views,
      `${this.current}.props.validationSchema`,
    );
  }

  getActive(args) {
    return this.views.length
      ? React.cloneElement(this.views[this.current], args)
      : null;
  }
}

export const useSteps = () => {
  const [step, setStep] = React.useState(0);
  const back = () => setStep(step - 1);
  const next = () => setStep(step + 1);
  const reset = () => setStep(0);

  return {
    step,
    reset,
    back,
    next,
  };
};

const withFormControls = ({
  validateForm,
  submitForm,
  isFirst,
  isLast,
  reset,
  back,
  next,
}) => {
  const { t } = useTranslation();

  const executeBack = () => {
    return isFirst ? reset() : back();
  };

  const executeNext = () => {
    return isLast
      ? submitForm
      : validateForm().then((errors) => {
          if (!Object.keys(errors).length) next();
        });
  };

  const renderBackButton = () =>
    !isFirst ? (
      <Button
        onClick={executeBack}
        style={{ marginRight: '1rem' }}
      >
        <KeyboardArrowLeft />
        {t('labels:back')}
      </Button>
    ) : null;

  const renderNextButton = () =>
    isLast ? (
      <Button type="submit">
        {t('labels:save')}
        <KeyboardArrowRight />
      </Button>
    ) : (
      <Button onClick={executeNext}>
        {t('labels:next')}
        <KeyboardArrowRight />
      </Button>
    );

  return {
    renderBackButton,
    renderNextButton,
  };
};

export const MultiStepFormik = ({
  done,
  onSubmit,
  children,
  steps,
  withForm,
  initialValues = {},
}) => {
  const { step, ...stepUtils } = useSteps();
  const reader = new StepReader(steps, step);

  const getControls = React.useCallback(
    (formikbag) =>
      withFormControls({
        isLast: step === reader.views.length - 1,
        isFirst: step === 0,
        ...stepUtils,
        ...formikbag,
      }),
    [step],
  );

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={reader.getValidation(step)}
      initialValues={{
        ...initialValues,
        ...reader.getValues(),
      }}
      onSubmit={(values, actions) =>
        onSubmit(values, actions).then((e) => {
          if (done) done();
          return e;
        })
      }
    >
      {(formikbag) => {
        const interior = children({
          activeStep: step,
          steps: reader.views,
          activeChild: reader.getActive(formikbag),
          ...getControls(formikbag),
          ...formikbag,
        });

        return withForm ? (
          <Form>{interior}</Form>
        ) : (
          interior
        );
      }}
    </Formik>
  );
};

const DialogWizard = ({
  isOpen,
  close,
  children,
  onSubmit,
  initialValues,
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:960px)');

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
      onClose={close}
      open={isOpen}
    >
      <MultiStepFormik
        steps={children}
        done={close}
        onSubmit={onSubmit}
        initialValues={initialValues}
        withForm
      >
        {({
          steps,
          activeStep,
          activeChild,
          isSubmitting,
          renderNextButton,
          renderBackButton,
        }) => (
          <>
            {isSubmitting && <LinearProgress />}
            <Box p={2}>
              <Container maxWidth="md">
                <DialogTitle disableTypography>
                  <Typography variant="h4">
                    {t(
                      `titles:${StepReader.getName(
                        activeChild,
                      )}`,
                    )}
                  </Typography>
                </DialogTitle>
                <DialogContent>{activeChild}</DialogContent>
                <Box mb={1} px={2} textAlign="right">
                  {renderBackButton()}
                  {renderNextButton()}
                </Box>
              </Container>
            </Box>
          </>
        )}
      </MultiStepFormik>
    </Dialog>
  );
};

DialogWizard.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  children: PropTypes.arrayOf([PropTypes.node]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

DialogWizard.defaultProps = {
  isOpen: false,
};

const HorizontalWizard = ({
  children,
  onSubmit,
  withForm,
  ...rest
}) => (
  <MultiStepFormik
    steps={children}
    onSubmit={onSubmit}
    withForm={withForm}
    {...rest}
  >
    {({
      steps,
      activeStep,
      activeChild,
      renderNextButton,
      renderBackButton,
    }) => (
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((ActiveStep, index) => (
            <Step key={index}>
              <StepLabel>
                {StepReader.getName(activeChild)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Container maxWidth="xl">
          {activeChild}
          <Container maxWidth="lg">
            <Box textAlign="right" my={2}>
              {renderBackButton()}
              {renderNextButton()}
            </Box>
          </Container>
        </Container>
      </Box>
    )}
  </MultiStepFormik>
);

HorizontalWizard.propTypes = {
  children: PropTypes.arrayOf([PropTypes.node]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const VerticalWizard = ({ children, onSubmit }) => {
  return (
    <MultiStepFormik
      onSubmit={onSubmit}
      steps={children}
      withForm
    >
      {({
        steps,
        activeStep,
        activeChild,
        renderBackButton,
        renderNextButton,
      }) => (
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((ActiveStep, index) => (
            <Step key={index}>
              <StepLabel>
                {StepReader.getName(activeChild)}
              </StepLabel>
              <StepContent>
                <Typography>
                  {StepReader.getName(activeChild)}
                </Typography>
                {activeChild}
                <Box mt={1}>
                  {renderBackButton()}
                  {renderNextButton()}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
    </MultiStepFormik>
  );
};

export { DialogWizard, HorizontalWizard, VerticalWizard };
