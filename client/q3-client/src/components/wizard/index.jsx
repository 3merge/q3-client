import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import { Tooltip } from '@material-ui/core';
import { useOpenState } from '../dialogs';

const Wizard = ({
  onSubmit,
  icon: Icon,
  steps,
  title,
  fab,
  ...rest
}) => {
  const [step, setStep] = React.useState(0);
  const { isOpen, open, close } = useOpenState();
  const { t } = useTranslation();

  const closeOnSuccess = (values, actions) =>
    onSubmit(values, actions).then((err) => {
      if (!err) close();
      return err;
    });

  const back = () => setStep(step - 1);
  const next = () => setStep(step + 1);

  return (
    <Formik
      {...rest}
      enableReinitialize
      onSubmit={closeOnSuccess}
      render={({ submitForm, isSubmitting, ...utils }) => (
        <Form>
          <Tooltip title={t('labels:launch')}>
            <IconButton onClick={open}>
              <Icon />
            </IconButton>
          </Tooltip>
          <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            onClose={close}
          >
            {isSubmitting && <LinearProgress />}

            {steps.length > 1 && (
              <MobileStepper
                steps={steps.length}
                variant="dots"
                position="static"
                activeStep={step}
              />
            )}

            <DialogTitle>
              {t(`titles:${title}`)}
            </DialogTitle>

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

              {steps.length - 1 === step ? (
                <DialogActions>
                  {step === 0 ? (
                    <Button onClick={close}>
                      {t('labels:nevermind')}
                    </Button>
                  ) : (
                    <Button onClick={back}>
                      {t('labels:back')}
                    </Button>
                  )}
                  <Button onClick={submitForm}>
                    {t('labels:save')}
                  </Button>
                </DialogActions>
              ) : (
                <DialogActions>
                  {step === 0 ? (
                    <Button onClick={close}>
                      {t('labels:nevermind')}
                    </Button>
                  ) : (
                    <Button onClick={back}>
                      {t('labels:back')}
                    </Button>
                  )}
                  <Button onClick={next}>
                    {t('labels:next')}
                  </Button>
                </DialogActions>
              )}
            </DialogContent>
          </Dialog>
        </Form>
      )}
    />
  );
};

Wizard.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.node),
  onSubmit: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  fab: PropTypes.bool.isRequired,
};

Wizard.defaultProps = {
  steps: [],
};

export default Wizard;
