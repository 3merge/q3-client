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

const Wizard = ({
  getValidation,
  getContent,
  onSubmit,
  icon: Icon,
  steps,
  title,
  isOpen,
  close,
  ...rest
}) => {
  const isMobile = useMediaQuery('(max-width:960px)');
  const [step, setStep] = React.useState(0);
  const { t } = useTranslation();

  const clearForm = () => {
    close();
    setStep(0);
  };

  const closeOnSuccess = (values, actions) =>
    onSubmit(values, actions).then((err) => {
      if (!err) clearForm();
      return err;
    });

  const back = () => setStep(step - 1);
  const next = () => setStep(step + 1);

  const renderBackButton = () =>
    step === 0 ? (
      <Button onClick={clearForm}>
        <TransitEnterexit />
        {t('labels:nevermind')}
      </Button>
    ) : (
      <Button onClick={back}>
        <KeyboardArrowLeft />
        {t('labels:back')}
      </Button>
    );

  const renderNextButton = (fn, done) =>
    steps.length - 1 === step ? (
      <Button onClick={done}>
        {t('labels:save')}
        <Publish />
      </Button>
    ) : (
      <Button
        onClick={() =>
          fn().then((errors) => {
            if (!Object.keys(errors).length) next();
          })
        }
      >
        {t('labels:next')}
        <KeyboardArrowRight />
      </Button>
    );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      onClose={clearForm}
      open={isOpen}
    >
      <Formik
        {...rest}
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={() => getValidation(step)}
        onSubmit={closeOnSuccess}
        render={({
          submitForm,
          isSubmitting,
          validateForm,
          resetForm,
          ...utils
        }) => (
          <Form>
            {isSubmitting && <LinearProgress />}
            {getContent && (
              <WizardHeader
                title={title}
                name={getContent(step)}
              />
            )}
            <DialogContent>
              {steps.map(
                (Step, i) =>
                  step === i && (
                    <Fade in key={i}>
                      <div>
                        <Step {...utils} />
                      </div>
                    </Fade>
                  ),
              )}
            </DialogContent>
            <MobileStepper
              steps={steps.length}
              variant="progress"
              position="static"
              activeStep={step}
              nextButton={renderNextButton(
                validateForm,
                submitForm,
              )}
              backButton={renderBackButton()}
            />
          </Form>
        )}
      />
    </Dialog>
  );
};

Wizard.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.node),
  onSubmit: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  getValidation: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

Wizard.defaultProps = {
  steps: [],
  isOpen: false,
};

export default Wizard;
