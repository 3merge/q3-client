/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import { Definitions, Dispatcher } from '../state';
import CreateDialog from './dialog';

const Add = ({ children, onComplete }) => {
  const { collectionName } = React.useContext(Definitions);
  const { post } = React.useContext(Dispatcher);
  const { Hide } = useAuth(collectionName);

  if (!children) return null;

  return (
    <Hide op="Create">
      <CreateDialog title={`${collectionName}New`}>
        {(done) =>
          React.cloneElement(children, {
            isNew: true,
            collectionName,
            onSubmit: (...args) =>
              post(...args)
                .then((r) => {
                  if (onComplete) onComplete(r);
                  return r;
                })
                .then(done),
          })
        }
      </CreateDialog>
    </Hide>
  );
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
