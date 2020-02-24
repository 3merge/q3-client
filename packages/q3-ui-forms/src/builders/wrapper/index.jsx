import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { useAuth } from 'q3-ui-permissions';
import * as yup from 'yup';
import { get } from 'lodash';
import BuilderState from '../builderState';
import { Validator } from '../../helpers/validation';
import {
  getInitialStatus,
  selectivelyKeepInitialValues,
  authenticationHelper,
} from './utils';

export const RevealOnValidation = ({
  validation,
  children,
}) => {
  const validationLengthMeasured = get(
    validation,
    '_nodes.length',
    null,
  );

  return (
    <Fade in={validationLengthMeasured}>
      <div>{children(validationLengthMeasured)}</div>
    </Fade>
  );
};

RevealOnValidation.propTypes = {
  /**
   * Child fn.
   */
  children: PropTypes.func.isRequired,

  /**
   * YUP validation schema.
   */
  validation: PropTypes.shape({
    _nodes: PropTypes.object,
  }).isRequired,
};

const Wrapper = (Component) => {
  const InnerForm = ({
    pick = [],
    collectionName,
    initialValues,
    validateOnMount = false,
    initialStatus,
    isNew,
    ...etc
  }) => {
    const [chain, setChain] = React.useState({});
    const validationSchema = yup.object().shape(chain);

    const {
      isDisabled,
      checkReadAuthorizationContext,
      checkEditAuthorizationContext,
    } = authenticationHelper(
      collectionName,
      useAuth(collectionName),
      isNew,
    );

    const setField = React.useCallback(
      (k, args) =>
        setChain((prevState) => ({
          ...prevState,
          [k]: new Validator(args).build(),
        })),
      [chain],
    );

    return (
      <RevealOnValidation validation={validationSchema}>
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
      </RevealOnValidation>
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
  };

  InnerForm.defaultProps = {
    initialValues: {},
    validateOnMount: false,
    isNew: false,
    initialStatus: null,
    pick: [],
  };
};

export default Wrapper;
