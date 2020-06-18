import React from 'react';
import PropTypes from 'prop-types';
import {
  useAuthorization,
  useDot,
  useFormContext,
  usePrevious,
  useValidation,
} from '../../hooks';
import Debugger from '../Debugger';
import Message from '../Message';
import WrapperContextMapper from './WrapperContextMapper';

const Wrapper = (Component) => {
  const InnerForm = ({
    children,
    drop,
    keep,
    marshalSelectively,
    marshal,
    modify,
    translate,
    collectionName,
    isNew,
    validateOnMount,
    initialStatus,
    onSubmit: handleSubmit,
    onReset: handleReset,
    initialValues: seed,
    debug,
    restart,
    showSuccessMessage,
    showPersistenceSnack,
    ...etc
  }) => {
    const {
      isDisabled,
      checkReadAuthorizationContext,
      checkEditAuthorizationContext,
    } = useAuthorization(collectionName, isNew, etc);

    const {
      setField,
      validationSchema,
      validateField,
      removeField,
      chain,
    } = useValidation();
    const {
      initialValues,
      onSubmit: forwardProcessStateValuesIntoOnSubmitHandler,
    } = useDot(
      {
        onSubmit: handleSubmit,
        marshalSelectively,
        keep,
        marshal,
        modify,
        translate,
      },
      seed,
    );

    const {
      errors,
      message,
      isSubmitting,
      onChange,
      onError,
      onReset,
      onSubmit,
      onSuccess,
      onValidate: validateAt,
      setErrors,
      setValues,
      values,
    } = useFormContext({
      initialValues,
      restart,
      validateField,
      validationSchema,
      showSuccessMessage,
    });

    const { clear } = usePrevious(
      values,
      showPersistenceSnack,
    );

    const execAllSubmitHandlers = onSubmit(() => {
      return forwardProcessStateValuesIntoOnSubmitHandler(
        values,
      )
        .then((res) => {
          clear();
          return onSuccess(res);
        })
        .catch((e) => {
          onError(e);
        });
    });

    return (
      <WrapperContextMapper
        canEdit={checkEditAuthorizationContext}
        canSee={checkReadAuthorizationContext}
        collectionName={collectionName}
        disable={isDisabled()}
        isNew={isNew}
        validationSchema={validationSchema}
        validateAt={validateAt}
        setField={setField}
        removeField={removeField}
        onReset={onReset}
        onChange={onChange}
        setValues={setValues}
        setErrors={setErrors}
        isSubmitting={isSubmitting}
        errors={errors}
        values={values}
        chain={chain}
      >
        <Component
          {...etc}
          onReset={handleReset}
          onSubmit={execAllSubmitHandlers}
        >
          {typeof children === 'function'
            ? children(values, errors)
            : children}
        </Component>
        <Message {...message} />
        <Debugger show={debug} />
      </WrapperContextMapper>
    );
  };

  InnerForm.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
      PropTypes.func,
    ]).isRequired,

    /**
     * Passed directly into Formik's provider.
     */
    // eslint-disable-next-line
    initialValues: PropTypes.object,

    /**
     * Resource/collection being modified
     */
    collectionName: PropTypes.string,

    /**
     * Resource/collection being modified
     */
    validateOnMount: PropTypes.bool,

    /**
     * Formik initial state text representation.
     */
    initialStatus: PropTypes.string,

    /**
     * Is this a create op?
     */
    isNew: PropTypes.bool,

    /**
     * Handle Formik onSubmit callback.
     */
    onSubmit: PropTypes.func.isRequired,

    /**
     * Specify which keys from initialValues to keep in the state.
     */
    keep: PropTypes.arrayOf(PropTypes.string),

    /**
     * Specify which keys to discard from the submit handler.
     */
    drop: PropTypes.arrayOf(PropTypes.string),

    /**
     * Run mutators on specific values pre-submit.
     */
    marshal: PropTypes.shape({}),

    /**
     * Run mutators on specific values pre-init.
     */
    modify: PropTypes.shape({}),

    /**
     * Adjust the shape of the state pre-modify.
     */
    translate: PropTypes.shape({}),

    /**
     * Will retain un-modified state values while marshalling date to onSubmit.
     */
    marshalSelectively: PropTypes.bool,

    /**
     * Will display all values and errors registered to the form's state.
     */
    debug: PropTypes.bool,

    /**
     * Will call onReset after the submission finishes.
     */
    restart: PropTypes.bool,

    onReset: PropTypes.func,

    /**
     * It will show the success payload's message inline.
     */
    showSuccessMessage: PropTypes.bool,

    /**
     * It will show a notification every time the state changes.
     */
    showPersistenceSnack: PropTypes.bool,
  };

  InnerForm.defaultProps = {
    initialValues: {},
    validateOnMount: false,
    collectionName: null,
    isNew: false,
    initialStatus: null,
    marshalSelectively: false,
    restart: false,
    debug: false,
    keep: [],
    drop: [],
    marshal: {},
    modify: {},
    translate: {},
    onReset: null,
    showSuccessMessage: false,
    showPersistenceSnack: false,
  };

  return InnerForm;
};

export default Wrapper;
