import React from 'react';
import PropTypes from 'prop-types';
import {
  useAuthorization,
  useDispatcher,
  useDot,
  useFormContext,
  useModified,
  useValidation,
} from '../../hooks';
import Debugger from '../Debugger';
import Message from '../Message';
import {
  AuthorizationState,
  BuilderState,
  ValidationState,
  DispatcherState,
} from '../../FormsContext';

export const InnerForm = ({
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
    removeField,
    chain,
    hasRegistered,
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
    setValues,
    setErrors,
    setFieldValue,
    setFieldError,
    removeFieldValue,
    removeFieldError,
    initFieldValue,
    values,
    errors,
    clearPreviousState,
    previousValues,
    isModified,
  } = useDispatcher(initialValues);

  const {
    message,
    isSubmitting,
    onChange,
    onError,
    onReset,
    onSubmit,
    onSuccess,
  } = useFormContext({
    restart,
    validationSchema,
    setFieldValue,
    setFieldError,
    showSuccessMessage,
    previousValues,
    setValues,
    setErrors,
    removeFieldValue,
    removeFieldError,
    values,
    errors,
  });

  // simply listens for changes and alerts the user
  useModified(isModified, showPersistenceSnack);

  const execAllSubmitHandlers = onSubmit(() => {
    return forwardProcessStateValuesIntoOnSubmitHandler(
      values,
    )
      .then((res) => {
        clearPreviousState();
        return onSuccess(res);
      })
      .catch((e) => {
        onError(e);
      });
  });

  return (
    <AuthorizationState.Provider
      value={{
        canEdit: checkEditAuthorizationContext,
        canSee: checkReadAuthorizationContext,
        collectionName,
        disable: isDisabled(),
        isNew,
      }}
    >
      <ValidationState.Provider
        value={{
          validationSchema,
          removeField,
          setField,
          chain,
          hasRegistered,
        }}
      >
        <DispatcherState.Provider
          value={{
            onReset,
            onChange,
            setValues,
            setErrors,
            removeFieldValue,
            removeFieldError,
            initFieldValue,
          }}
        >
          <BuilderState.Provider
            value={{
              isSubmitting,
              errors,
              values,
            }}
          >
            {children({
              values,
              errors,
              onSubmit: execAllSubmitHandlers,
              onReset: handleReset,
              ...etc,
            })}
            <Message {...message} />
            <Debugger show={debug} />
          </BuilderState.Provider>
        </DispatcherState.Provider>
      </ValidationState.Provider>
    </AuthorizationState.Provider>
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

export default (Component) => (props) => (
  <InnerForm {...props}>
    {({ values, errors, ...rest }) => (
      <Component {...rest}>
        {typeof props.children === 'function'
          ? props.children(values, errors)
          : props.children}
      </Component>
    )}
  </InnerForm>
);
