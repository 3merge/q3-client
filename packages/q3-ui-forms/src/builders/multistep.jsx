import React from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

export default ({
  children,
  onSubmit,
  onReset,
  initialValues = {},
  collectionName,
  cleanup,
  toolbar,
  isNew,
}) => {
  const ref = React.useRef();
  const childrenArray = React.Children.toArray(children);
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors, setErrors] = React.useState([]);
  const [cache, setCache] = React.useState(initialValues);

  const hasErrors = () => {
    const arr = [];
    ref.current
      .querySelectorAll('fieldset')
      .forEach((node, i) => {
        if (node.dataset.valid === 'false') arr.push(i);
      });

    setErrors(arr);

    if (arr.length) {
      throw new Error('Invalid stepper detected');
    }
  };

  const submitMultiStepForm = (actions) =>
    new Promise((resolve) => {
      hasErrors();
      resolve();
    }).then(() =>
      onSubmit(cache, actions)
        .then(() => {
          if (!cleanup) return;
          setCache(initialValues);
          setActiveStep(0);
        })
        .catch((e) => {
          return e;
        }),
    );

  const processReset = React.useCallback(() => {
    if (activeStep === 0) {
      setCache(initialValues);
      onReset();
    } else {
      setActiveStep(activeStep - 1);
    }
  }, [activeStep]);

  const processSubmit = React.useCallback(
    (values, actions) =>
      activeStep >= childrenArray.length - 1
        ? submitMultiStepForm(actions)
        : new Promise((resolve) => {
            setActiveStep(activeStep + 1);
            setCache({ ...cache, ...values });
            resolve();
          }),
    [activeStep],
  );

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        return submitMultiStepForm();
      }}
    >
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
      >
        {childrenArray.map((child, i) => (
          <Step key={i}>
            <StepLabel error={errors.includes(i)}>
              {child.props.name}
            </StepLabel>
            <StepContent>
              {React.cloneElement(child, {
                collectionName,
                initialValues: cache,
                onReset: processReset,
                onSubmit: processSubmit,
                onInit: hasErrors,
                fieldset: true,
                isNew,
              })}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </form>
  );
};
