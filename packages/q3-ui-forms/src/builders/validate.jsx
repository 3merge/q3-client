import React from 'react';
import { useFormikContext } from 'formik';

const Validate = () => {
  const f = useFormikContext();
  const [
    deferredValidationOnMount,
    setDeferredValidationOnMount,
  ] = React.useState(false);

  React.useEffect(() => {
    if (!deferredValidationOnMount && f.status === 'Ready')
      f.validateForm().then(() => {
        setDeferredValidationOnMount(true);
        f.setStatus('Validated');
      });
  }, [setDeferredValidationOnMount, f.status]);

  return null;
};

export default Validate;
