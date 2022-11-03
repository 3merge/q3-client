import React from 'react';
import { Hidden } from '@material-ui/core';
import ToolbarPortal from '../components/ToolbarPortal';
import AddNewDialog from '../components/AddNewDialog';
import AddNewIdAuth from '../components/AddNewIdAuth';
import SearchWithNgramAuth from '../components/SearchWithNgramAuth';
import Back from '../containers/back';

export default (forwardedProps = {}) =>
  () => {
    const {
      addComponent: AddComponent,
      addComponentWrapper: AddComponentWrapper,
    } = forwardedProps;

    return (
      <>
        <Hidden lgUp>
          <ToolbarPortal id="appbar-back">
            <Back />
          </ToolbarPortal>
        </Hidden>
        <ToolbarPortal id="appbar-search">
          <SearchWithNgramAuth />
        </ToolbarPortal>
        {AddComponent ? (
          <ToolbarPortal id="appbar-create">
            <AddNewIdAuth>
              <AddNewDialog>
                {(closeDialog) =>
                  AddComponentWrapper ? (
                    <AddComponentWrapper
                      close={closeDialog}
                    >
                      <AddComponent />
                    </AddComponentWrapper>
                  ) : (
                    <AddComponent close={closeDialog} />
                  )
                }
              </AddNewDialog>
            </AddNewIdAuth>
          </ToolbarPortal>
        ) : null}
      </>
    );
  };
