/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import { Create as CreateDialog } from 'q3-ui/lib/dialogs';
import { useAuth } from 'q3-ui-permissions';
import Context from './state';

const Add = ({
  fields,
  title,
  initialValues,
  children,
}) => {
  const {
    collectionName,
    post,
    resourceName,
  } = React.useContext(Context);
  const { Hide } = useAuth(collectionName);

  return (
    <Hide op="Create">
      {(fields || children) && (
        <CreateDialog
          render={(done) =>
            children ? (
              React.cloneElement(children, {
                isNew: true,
                collectionName,
              })
            ) : (
              <div />
            )
          }
        />
      )}
    </Hide>
  );
};

export default Add;
