import 'react-json-pretty/themes/acai.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Skeleton from '@material-ui/lab/Skeleton';
import Fade from '@material-ui/core/Fade';
import JSONPretty from 'react-json-pretty';
import withWrapper from './wrapper';

const FieldSkeleton = (
  <Skeleton
    variant="rect"
    style={{ margin: '4px 0' }}
    height={56}
  />
);

const FormWrapper = withWrapper(
  ({
    children,
    initialValues,
    collectionName,
    authorization,
    validation,
    onSubmit,
    onReset,
    onInit,
    fieldset,
    debug,
    name,
    isNew,
  }) => {
    const hasSchema =
      validation.chain && validation.chain._nodes.length;

    const handleReset = React.useCallback(
      ({ status, resetForm }) => {
        if (status !== 'back') return;
        resetForm();
        onReset();
      },
      [onReset],
    );

    const handleInit = ({
      status,
      validateForm,
      setStatus,
      isValidating,
    }) => {
      if (!hasSchema || status !== 'Initializing') return;

      if (!isValidating && !isNew) {
        validateForm().then(() => {
          if (typeof onInit === 'function') onInit();
          setStatus('Ready');
        });
      } else if (isNew) {
        setStatus('Ready');
      }
    };

    React.useEffect(() => {
      authorization.setCollectionName(collectionName);
      authorization.setModificationType(isNew);
    }, []);

    return (
      <Formik
        enableReinitialize
        initialStatus="Initializing"
        validationSchema={validation.chain}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ values, errors, isValid, status, ...rest }) => (
          <>
            {handleReset(rest)}
            {handleInit(rest)}

            {!fieldset ? (
              <Form>
                {children}
                {debug && (
                  <JSONPretty data={{ values, errors }} />
                )}
              </Form>
            ) : (
              <fieldset
                data-name={name}
                data-valid={isValid}
                data-errors={JSON.stringify(errors)}
                style={{
                  border: 0,
                  padding: 0,
                  margin: 0,
                }}
              >
                {children}
              </fieldset>
            )}
          </>
        )}
      </Formik>
    );
  },
);

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  html: PropTypes.bool,
  debug: PropTypes.bool,
};

FormWrapper.defaultProps = {
  html: true,
  debug: false,
};

export default FormWrapper;
