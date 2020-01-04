import React from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

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
    const arr = Array.from(
      ref.current.querySelectorAll('fieldset'),
    ).reduce((a, node, i) => {
      if (node.dataset.valid === 'false') a.push(i);
      return a;
    }, []);

    setErrors(arr);
    if (arr.length)
      throw new Error('Invalid stepper detected');
  };

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
        ? Promise.resolve(hasErrors).then(() =>
            onSubmit(values, actions).then(() => {
              if (!cleanup) return;
              setCache(initialValues);
              setActiveStep(0);
            }),
          )
        : new Promise((resolve) => {
            setActiveStep(activeStep + 1);
            setCache((prev) => ({ ...prev, ...values }));
            resolve();
          }),
    [activeStep],
  );

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
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
