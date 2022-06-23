import React from 'react';
import ToolbarCollection from '../components/ToolbarCollection';
import AddNewDialog from '../components/AddNewDialog';
import AddNewIdAuth from '../components/AddNewIdAuth';

export default (forwardedProps = {}) =>
  (props) => {
    const {
      addComponent: AddComponent,
      addComponentWrapper: AddComponentWrapper,
      ...rest
    } = forwardedProps;

    return (
      <ToolbarCollection {...rest} {...props}>
        {AddComponent ? (
          <AddNewIdAuth>
            <AddNewDialog>
              {(closeDialog) =>
                AddComponentWrapper ? (
                  <AddComponentWrapper close={closeDialog}>
                    <AddComponent />
                  </AddComponentWrapper>
                ) : (
                  <AddComponent close={closeDialog} />
                )
              }
            </AddNewDialog>
          </AddNewIdAuth>
        ) : null}
      </ToolbarCollection>
    );
  };
