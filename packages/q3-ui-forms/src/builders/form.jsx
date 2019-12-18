import 'react-json-pretty/themes/acai.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import JSONPretty from 'react-json-pretty';
import withWrapper from './wrapper';

const FormWrapper = withWrapper(
  ({
    children,
    initialValues,
    validation,
    onSubmit,
    onReset,
    onInit,
    fieldset,
    debug,
    name,
    isNew,
  }) => {
    const [schema, setSchema] = React.useState();
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
      if (
        !schema ||
        !schema._nodes.length ||
        status !== 'Initializing'
      )
        return;

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
      setSchema(validation.getChain());
    }, []);

    return (
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialStatus="Initializing"
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ values, errors, isValid, ...rest }) => (
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
