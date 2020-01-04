import 'react-json-pretty/themes/acai.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { get } from 'lodash';
import JSONPretty from 'react-json-pretty';
import withWrapper from './wrapper';

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
    const hasSchema = get(
      validation,
      'chain._nodes.length',
      null,
    );

    const handleReset = React.useCallback(
      ({ status, resetForm }) => {
        if (status !== 'back') return;
        resetForm();
        onReset();
      },
      [onReset],
    );

    const handleInit = React.useCallback(
      ({
        status,
        validateForm,
        setStatus,
        isValidating,
      }) => {
        if (hasSchema === 0 || status !== 'Initializing')
          return;

        if (!isValidating && !isNew) {
          validateForm().then(() => {
            if (typeof onInit === 'function') onInit();
            setStatus('Ready');
          });
        } else if (isNew) {
          setStatus('Ready');
        }
      },
      [hasSchema],
    );

    React.useEffect(() => {
      authorization.setCollectionName(collectionName);
      authorization.setModificationType(isNew);
    }, []);

    return (
      <Formik
        key={JSON.stringify(initialValues)}
        enableReinitialize
        initialStatus="Initializing"
        validationSchema={validation.chain}
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
