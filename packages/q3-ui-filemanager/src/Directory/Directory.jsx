import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import useDropZoneAcceptedFiles from '../useDropZoneAcceptedFiles';
import DirectoryToolbar from '../DirectoryToolbar';
import DirectoryAddFolder from '../DirectoryAddFolder';
import DirectoryBreadcrumbs from '../DirectoryBreadcrumbs';
import DirectoryPendingFiles from '../DirectoryPendingFiles';
import DirectorySort from '../DirectorySort';
import DirectoryView from '../DirectoryView';
import DropZoneWrapper from '../DropZoneWrapper';
import DropZoneInputWrapper from '../DropZoneInputWrapper';
import DocumentViewer from '../DocumentViewer';
import DialogMoveTo from '../DialogMoveTo';
import DragHandlerPreview from '../DragHandlerPreview';
import DragToSelect from '../DragToSelect';

/**
 * 1. Individual and bulk actions
2. Image compression
3. Thumbnails
4. API - folder function for replacing/compounding and having a stub
5. Testing 

 */

const Directory = () => {
  const { onDrop, pending } = useDropZoneAcceptedFiles();

  return (
    <DragToSelect>
      <DndProvider backend={HTML5Backend} key={1}>
        <DocumentViewer>
          {(appendViewerToEach) => (
            <DirectorySort>
              {(
                { files = [], siblings = [] },
                SortingComponent,
              ) => (
                <DirectoryView>
                  {(Component, SwitcherComponent) => (
                    <>
                      <DropZoneWrapper onDrop={onDrop} />
                      <DirectoryBreadcrumbs />
                      <DialogMoveTo>
                        {({ appendMoverToEach, open }) => (
                          <>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                            >
                              <Box>
                                <DirectoryAddFolder />
                                <DropZoneInputWrapper
                                  onDrop={onDrop}
                                />
                              </Box>
                              <Box
                                alignItems="center"
                                display="flex"
                              >
                                <DirectoryPendingFiles
                                  pending={pending}
                                />
                                <DirectoryToolbar
                                  openMoveTo={open}
                                />
                                <SortingComponent />
                                <SwitcherComponent />
                              </Box>
                            </Box>
                            <Box py={2}>
                              <Divider />
                            </Box>
                            <Component
                              files={appendMoverToEach(
                                appendViewerToEach(files),
                              )}
                              siblings={siblings}
                            />
                          </>
                        )}
                      </DialogMoveTo>
                    </>
                  )}
                </DirectoryView>
              )}
            </DirectorySort>
          )}
        </DocumentViewer>
        <DragHandlerPreview />
      </DndProvider>
    </DragToSelect>
  );
};

export default Directory;
