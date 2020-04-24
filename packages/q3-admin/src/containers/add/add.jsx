/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import { navigate } from '@reach/router';
import { Definitions, Dispatcher } from '../state';
import CreateDialog from './dialog';

export const addToDirectoryPath = (dir, id) =>
  id ? navigate(`${dir}/${id}`) : null;

export const getIdByKey = (doc, pathname) =>
  get(doc, `${pathname}.id`, null);

export const handleSuccess = (
  directoryPath,
  resourceNameSingular,
  next,
) => (res) => {
  if (next) next(res);
  addToDirectoryPath(
    directoryPath,
    getIdByKey(res, resourceNameSingular),
  );

  return res;
};

const Add = ({ children, onComplete }) => {
  const {
    collectionName,
    directoryPath,
    resourceNameSingular,
  } = React.useContext(Definitions);
  const { post } = React.useContext(Dispatcher);
  const { Hide } = useAuth(collectionName);

  return children ? (
    <Hide op="Create">
      <CreateDialog title={`${collectionName}New`}>
        {(done) =>
          React.cloneElement(children, {
            isNew: true,
            collectionName,
            onSubmit: (...args) =>
              post(...args)
                .then(
                  handleSuccess(
                    directoryPath,
                    resourceNameSingular,
                    onComplete,
                  ),
                )
                .then(done),
          })
        }
      </CreateDialog>
    </Hide>
  ) : null;
};

Add.propTypes = {
  /**
   * The component for inside the fullscreen dialog.
   */
  children: PropTypes.node.isRequired,

  /**
   * An optional callback once on successful creation.
   */
  onComplete: PropTypes.func,
};

Add.defaultProps = {
  onComplete: null,
};

export default Add;
