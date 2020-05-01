import React from 'react';
import PropTypes from 'prop-types';
import BuilderState from '../builderState';
import Reveal from '../reveal';
import { getInitialStatus } from './utils';
import useAuthentication from './useAuthentication';
import useValidation from './useValidation';
import useDot from './useDot';

const Wrapper = (Component) => {
  const InnerForm = ({
    drop,
    keep,
    marshal,
    modify,
    translate,
    collectionName,
    isNew,
    validateOnMount,
    initialStatus,
    onSubmit: handleSubmit,
    initialValues: seed,
    ...etc
  }) => {
    const {
      isDisabled,
      checkReadAuthorizationContext,
      checkEditAuthorizationContext,
    } = useAuthentication(collectionName, isNew, etc);
    const { setField, validationSchema } = useValidation();

    const { initialValues, onSubmit } = useDot(
      {
        onSubmit: handleSubmit,
        keep,
        marshal,
        modify,
        translate,
      },
      seed,
    );

    return (
      <Reveal validation={validationSchema}>
        {(hasValidationLength) => (
          <BuilderState.Provider
            value={{
              authorization: {
                checkEditAuthorizationContext,
                checkReadAuthorizationContext,
                disable: isDisabled(),
              },
              validation: {
                run: validateOnMount,
                chain: validationSchema,
                isReady: hasValidationLength,
                setField,
              },
            }}
          >
            <BuilderState.Consumer>
              {(inst) => (
                <Component
                  {...etc}
                  {...inst}
                  onSubmit={onSubmit}
                  isNew={isNew}
                  formikProps={{
                    validationSchema,
                    enableReinitialize: true,
                    initialValues,
                    initialStatus: getInitialStatus(
                      hasValidationLength,
                      initialStatus,
                    ),
                  }}
                />
              )}
            </BuilderState.Consumer>
          </BuilderState.Provider>
        )}
      </Reveal>
    );
  };

  InnerForm.propTypes = {
    children: PropTypes.node.isRequired,

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
  };

  InnerForm.defaultProps = {
    initialValues: {},
    validateOnMount: false,
    collectionName: null,
    isNew: false,
    initialStatus: null,
    keep: [],
    drop: [],
    marshal: {},
    modify: {},
    translate: {},
  };

  return InnerForm;
};

export default Wrapper;
