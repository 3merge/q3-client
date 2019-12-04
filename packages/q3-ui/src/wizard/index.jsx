import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TransitEnterexit from '@material-ui/icons/TransitEnterexit';
import Publish from '@material-ui/icons/Publish';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

export const MultiStepFormik = ({
  done,
  onSubmit,
  getValidation,
  children,
  steps,
  ...rest
}) => {
  const { step, back, next, reset } = useSteps();
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  return (
    <Formik
      {...rest}
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={() => getValidation(step)}
      onSubmit={(values, actions) =>
        onSubmit(values, actions).then((e) => {
          if (done) done();
          return e;
        })
      }
    >
      {({ validateForm, submitForm, ...etc }) => (
        <Form>
          {children({
            ...etc,
            isFirst,
            isLast,
            activeStep: step,
            back() {
              return isFirst ? reset() : back();
            },
            next() {
              return isLast
                ? submitForm
                : validateForm().then((errors) => {
                    if (!Object.keys(errors).length) next();
                  });
            },
          })}
        </Form>
      )}
    </Formik>
  );
};

const WizardHeader = ({ title, name }) => {
  const { t } = useTranslation();
  return name ? (
    <Box px={2} mt={1}>
      <Typography variant="overline" gutterBottom>
        {t(`titles:${title}`)}
      </Typography>
      <Typography variant="h3" gutterBottom>
        {t(`titles:${name}`)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t(`descriptions:${name}`)}
      </Typography>
    </Box>
  ) : null;
};

WizardHeader.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export const getContentFromProps = ({
  getContent,
  position = 0,
}) =>
  Array.isArray(getContent)
    ? getContent[position]
    : getContent;

export const getSteps = ({ steps }) =>
  (Array.isArray(steps) ? steps : [steps]).filter(Boolean);

const Wizard = ({
  icon: Icon,
  title,
  isOpen,
  close,
  isNew,
  ...rest
}) => {
  const isMobile = useMediaQuery('(max-width:960px)');
  const { t } = useTranslation();
  const steps = getSteps(rest);

  const renderBackButton = (fn, isFirst) =>
    isFirst ? (
      <Button onClick={close}>
        <TransitEnterexit />
        {t('labels:nevermind')}
      </Button>
    ) : (
      <Button onClick={fn}>
        <KeyboardArrowLeft />
        {t('labels:back')}
      </Button>
    );

  const renderNextButton = (fn, isLast) =>
    isLast ? (
      <Button type="submit">
        {t('labels:save')}
        <Publish />
      </Button>
    ) : (
      <Button onClick={fn}>
        {t('labels:next')}
        <KeyboardArrowRight />
      </Button>
    );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      onClose={close}
      open={isOpen}
    >
      <MultiStepFormik steps={steps} done={close} {...rest}>
        {({
          activeStep,
          isFirst,
          isLast,
          next,
          back,
          isSubmitting,
          values,
          errors,
        }) => (
          <>
            {isSubmitting && <LinearProgress />}
            <WizardHeader
              title={title}
              name={getContentFromProps({
                position: activeStep,
                ...rest,
              })}
            />
            <DialogContent>
              {steps.map(
                (Step, i) =>
                  activeStep === i && (
                    <Fade in key={i}>
                      <div>
                        <Step
                          values={values}
                          errors={errors}
                          isNew={isNew}
                        />
                      </div>
                    </Fade>
                  ),
              )}
            </DialogContent>
            <MobileStepper
              steps={steps.length}
              position="static"
              activeStep={activeStep}
              backButton={renderBackButton(back, isFirst)}
              nextButton={renderNextButton(next, isLast)}
            />
          </>
        )}
      </MultiStepFormik>
    </Dialog>
  );
};

Wizard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  getValidation: PropTypes.func.isRequired,
  getContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  steps: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  authFn: PropTypes.func,
};

Wizard.defaultProps = {
  steps: [],
  isOpen: false,
  authFn: null,
};

export default Wizard;
