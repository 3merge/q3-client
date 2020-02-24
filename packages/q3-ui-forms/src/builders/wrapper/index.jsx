import React from 'react';
import PropTypes from 'prop-types';
import BuilderState from '../builderState';
import Reveal from '../reveal';
import {
  getInitialStatus,
  selectivelyKeepInitialValues,
} from './utils';
import useAuthentication from './useAuthentication';
import useValidation from './useValidation';

const Wrapper = (Component) => {
  const InnerForm = ({
    pick,
    collectionName,
    initialValues,
    validateOnMount,
    initialStatus,
    mapPick,
    isNew,
    ...etc
  }) => {
    const {
      isDisabled,
      checkReadAuthorizationContext,
      checkEditAuthorizationContext,
    } = useAuthentication(collectionName, isNew);
    const { setField, validationSchema } = useValidation();

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
                  isNew={isNew}
                  formikProps={{
                    validationSchema,
                    enableReinitialize: true,

                    initialValues: selectivelyKeepInitialValues(
                      initialValues,
                      pick,
                      mapPick,
                    ),

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
     * Execute lodash's pick fn against initialValues.
     */
    pick: PropTypes.arrayOf(PropTypes.string),

    /**
     * Passed directly into Formik's provider.
     */
    // eslint-disable-next-line
    initialValues: PropTypes.object,

    /**
     * Resource/collection being modified
     */
    collectionName: PropTypes.string.isRequired,

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
     *Transform the initialValues before the pick op.
     */
    mapPick: PropTypes.func,
  };

  InnerForm.defaultProps = {
    initialValues: {},
    validateOnMount: false,
    isNew: false,
    initialStatus: null,
    pick: [],
    mapPick: null,
  };

  return InnerForm;
};

export default Wrapper;
