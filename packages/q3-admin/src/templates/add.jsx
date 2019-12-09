/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import FormBuilder from 'q3-ui-forms/lib/builders/submit';
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
              <FormBuilder
                isNew
                collectionName={collectionName}
                dividers={false}
                done={done}
                onSubmit={post}
                fields={fields}
                initialValues={initialValues}
                title={
                  title || `add${capitalize(resourceName)}`
                }
              />
            )
          }
        />
      )}
    </Hide>
  );
};

export default Add;
