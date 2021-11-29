import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import Box from '@material-ui/core/Box';
import Back from '../Back';
import Next from '../Next';
import withWrapper from '../Wrapper';
import { getAllMultistepFieldsetComponents } from '../Fieldset';
import FieldsetSteppter from '../FieldsetStepper';

export default withWrapper(({ children, onSubmit }) => {
  const { t } = useTranslation('labels');
  const [activeStep, setActiveStep] = React.useState(0);

  const childrenArray =
    getAllMultistepFieldsetComponents(children);

  const isFirst = (v) => v === 0;
  const isLast = (v) => v >= childrenArray.length - 1;

  const getNextLabel = (i) =>
    t(isLast(i) ? 'save' : 'next');

  const incrementStepCounter = (val) => (e) => {
    e.preventDefault();
    setActiveStep(activeStep + val);
  };

  return (
    <Box noValidate component="form" onSubmit={onSubmit}>
      <FieldsetSteppter
        steps={childrenArray}
        activeStep={activeStep}
        onClickHandler={(v) => () => setActiveStep(v)}
      >
        {({ index }) => (
          <Box mt={1}>
            {!isFirst(index) && (
              <Back
                onClick={incrementStepCounter(-1)}
                label={t('back')}
              />
            )}
            <Next
              label={getNextLabel(index)}
              submit={isLast(activeStep)}
              onClick={incrementStepCounter(1)}
            />
          </Box>
        )}
      </FieldsetSteppter>
    </Box>
  );
});
