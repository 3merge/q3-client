import React from 'react';
import { useFormikContext } from 'formik';
import { isReady } from '../../helpers';
import BuilderState from '../builderState';
import Message from './message';

const Validate = () => {
  const [
    deferredValidationOnMount,
    setDeferredValidationOnMount,
  ] = React.useState(false);
  const f = useFormikContext();

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

  return <Message text={f.status} />;
};

export default Validate;
