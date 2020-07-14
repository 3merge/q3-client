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
  unwind,
  children,
  keep,
  marshalSelectively,
  marshal,
  modify,
  translate,
  collectionName,
  isNew,
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
      unwind,
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
            setFieldError,
            setFieldValue,
          }}
        >
          <BuilderState.Provider
            value={{
              // cannot be a dispatcher due to memoization
              // it requires fresh values and errors
              onSubmit: execAllSubmitHandlers,
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
   * Is this a create op?
   */
  isNew: PropTypes.bool,

  /**
   * Handle Formik onSubmit callback.
   */
  onSubmit: PropTypes.func,

  /**
   * Specify which keys from initialValues to keep in the state.
   */
  keep: PropTypes.arrayOf(PropTypes.string),

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

  /**
   * It will run flat on specified keys in the initial state.
   */
  unwind: PropTypes.arrayOf(PropTypes.array),
};

InnerForm.defaultProps = {
  initialValues: {},
  collectionName: null,
  isNew: false,
  marshalSelectively: false,
  restart: false,
  debug: false,
  keep: [],
  marshal: {},
  modify: {},
  translate: {},
  onReset: null,
  showSuccessMessage: false,
  showPersistenceSnack: false,
  unwind: [],
  // eslint-disable-next-line
  onSubmit: console.log,
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
