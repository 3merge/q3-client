import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import useDropZoneAcceptedFiles from '../useDropZoneAcceptedFiles';
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
                      <Container>
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
                            <SortingComponent />
                            <SwitcherComponent />
                          </Box>
                        </Box>
                        <Box py={2}>
                          <Divider />
                        </Box>
                      </Container>
                      <DialogMoveTo>
                        {({ appendMoverToEach, open }) => (
                          <Component
                            files={appendMoverToEach(
                              appendViewerToEach(files),
                            )}
                            siblings={siblings}
                          />
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
