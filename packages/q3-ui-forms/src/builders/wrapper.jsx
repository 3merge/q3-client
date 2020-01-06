import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import * as yup from 'yup';
import { get } from 'lodash';
import BuilderState from './builderState';
import { Validator } from '../helpers/validation';

const Wrapper = (Component) => ({
  collectionName,
  initialValues = {},
  isNew = true,
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

  return (
    <BuilderState.Provider
      value={{
        authorization: {
          checkEditAuthorizationContext,
          checkReadAuthorizationContext,
        },
        validation: {
          chain: yup.object().shape(chain),
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
              validateOnBlur: false,
              validateOnChange: true,
              enableReinitialize: true,
              validateOnMount: !isNew,
              validationSchema: validation,
              initialValues: get(
                validation,
                '_nodes.length',
                null,
              )
                ? initialValues
                : {},
            }}
          />
        )}
      </BuilderState.Consumer>
    </BuilderState.Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
