import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
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
  marshalAuthorizationContext,
  marshal,
  modify,
  translate,
  collectionName,
  isNew,
  onSubmit: handleSubmit,
  onReset: handleReset,
  initialValues: seed,
  initialErrors,
  debug,
  restart,
  showSuccessMessage,
  showPersistenceSnack,
  under,
  ...etc
}) => {
  const [attachments, setAttachments] = React.useState([]);

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
    resetFieldValue,
    initFieldValue,
    values,
    errors,
    clearPreviousState,
    previousValues,
    isModified,
  } = useDispatcher(initialValues, initialErrors);

  const castUnder = (xs) => (under ? { [under]: xs } : xs);

  const {
    isDisabled,
    checkReadAuthorizationContext,
    checkEditAuthorizationContext,
    ...authFieldOptions
  } = useAuthorization(collectionName, isNew, {
    ...etc,
    currentValues: isFunction(marshalAuthorizationContext)
      ? marshalAuthorizationContext(
          castUnder(values),
          castUnder(seed),
        )
      : castUnder(values),
  });

  const {
    message,
    isSubmitting,
    onChange,
    onError,
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

  const onReset = () => {
    setValues(seed);
    setErrors(initialErrors);
  };

  const execAllSubmitHandlers = onSubmit(() => {
    return forwardProcessStateValuesIntoOnSubmitHandler(
      values,
      attachments,
    )
      .then((res) => {
        clearPreviousState();
        if (restart) onReset();
        // always clear the files
        setAttachments([]);
        return onSuccess(res);
      })
      .catch((e) => {
        onError(e);
      });
  });

  return (
    <AuthorizationState.Provider
      value={{
        ...authFieldOptions,
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
            resetFieldValue,
            initFieldValue,
            setFieldError,
            setFieldValue,
            setAttachments,
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
              attachments,
              initialValues,
            }}
          >
            {children({
              values,
              errors,
              onSubmit: execAllSubmitHandlers,
              onReset: handleReset || onReset,
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

  // eslint-disable-next-line
  initialValues: PropTypes.object,
  // eslint-disable-next-line
  initialErrors: PropTypes.object,

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

  /**
   * Use to insert top-level data into the form.
   */
  marshalAuthorizationContext: PropTypes.func,

  /**
   * Use to treat data as sub-document for permissions
   */
  under: PropTypes.string,
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
  initialErrors: {},
  marshalAuthorizationContext: undefined,
  under: undefined,
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
