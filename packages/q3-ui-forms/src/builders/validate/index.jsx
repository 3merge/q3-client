import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import Typography from '@material-ui/core/Typography';
import { isReady } from '../../helpers';
import BuilderState from '../builderState';
import useStyle from './useStyle';

export const useStatusDisplay = (f) => {
  const { t } = useTranslation('descriptions');
  const { status } = f;
  const isString = typeof status === 'string';

  const doesStatusStartWith = (name) =>
    isString ? !!status.startsWith(name) : false;

  const isError = doesStatusStartWith('Error:');
  const isSuccessful = doesStatusStartWith('Success:');
  const { inlineMsg } = useStyle({ isError });

  if (!isString) return null;

  const msg = t(status.split(':').pop());

  if (isError)
    return (
      <Typography
        className={inlineMsg}
        component="small"
        gutterBottom
      >
        {msg}
      </Typography>
    );

  if (isSuccessful)
    return (
      <Typography
        className={inlineMsg}
        component="small"
        gutterBottom
      >
        {msg}
      </Typography>
    );

  return null;
};

const Validate = () => {
  const [
    deferredValidationOnMount,
    setDeferredValidationOnMount,
  ] = React.useState(false);
  const f = useFormikContext();
  const inline = useStatusDisplay(f);
  const {
    validation: { run },
  } = React.useContext(BuilderState);

  React.useEffect(() => {
    if (!deferredValidationOnMount && isReady(f) && run)
      f.validateForm().then(() => {
        setDeferredValidationOnMount(true);
        f.setStatus('Validated');
      });
  }, [setDeferredValidationOnMount, f.status]);

  return inline;
};

export default Validate;
