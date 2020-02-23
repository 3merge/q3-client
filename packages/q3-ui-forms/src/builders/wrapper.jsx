import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { useAuth } from 'q3-ui-permissions';
import * as yup from 'yup';
import { get } from 'lodash';
import BuilderState from './builderState';
import { Validator } from '../helpers/validation';

export const getInitialStatus = (len, value) => {
  if (len) return value || 'Ready';
  return 'Initializing';
};

const Wrapper = (Component) => ({
  pick = [],
  collectionName,
  initialValues = {},
  validateOnMount = false,
  initialStatus,
  isNew,
  ...etc
}) => {
  const [chain, setChain] = React.useState({});
  const authorization = useAuth(collectionName);

  const setField = React.useCallback(
    (k, args) =>
      setChain((prevState) => ({
        ...prevState,
        [k]: new Validator(args).build(),
      })),
    [chain],
  );

  const getSubmitBehaviour = () => {
    if (!collectionName) return false;
    if (isNew) return !authorization.canCreate;
    return !authorization.canEdit;
  };

  const checkReadAuthorizationContext = React.useCallback(
    (name) =>
      collectionName ? authorization.canSeeSub(name) : true,
    [collectionName],
  );

  const checkEditAuthorizationContext = React.useCallback(
    (name) => {
      if (!collectionName) return true;
      return isNew
        ? authorization.canCreateSub(name)
        : authorization.canEditSub(name);
    },
    [collectionName],
  );

  const validation = yup.object().shape(chain);
  const len = get(validation, '_nodes.length', null);

  return (
    <BuilderState.Provider
      value={{
        authorization: {
          checkEditAuthorizationContext,
          checkReadAuthorizationContext,
          disable: getSubmitBehaviour(),
        },
        validation: {
          run: validateOnMount,
          isReady: len !== null,
          chain: yup.object().shape(chain),
          setField,
        },
      }}
    >
      <BuilderState.Consumer>
        {(inst) => (
          <Fade in={len}>
            <div>
              <Component
                {...etc}
                {...inst}
                isNew={isNew}
                formikProps={{
                  enableReinitialize: true,
                  validationSchema: validation,
                  initialValues,

                  initialStatus: getInitialStatus(
                    len,
                    initialStatus,
                  ),
                }}
              />
            </div>
          </Fade>
        )}
      </BuilderState.Consumer>
    </BuilderState.Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
