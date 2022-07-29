import React from 'react';
import Box from '@material-ui/core/Box';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import classnames from 'classnames';
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
import DragHandlerPreview from '../DragHandlerPreview';
import DragToSelect from '../DragToSelect';
import useStyle from './styles';
import { isTouchDevice } from '../utils';

// eslint-disable-next-line
const Directory = ({ initialView }) => {
  const { onDrop, pending } = useDropZoneAcceptedFiles();
  const cls = useStyle();

  return (
    <DragToSelect>
      <DndProvider
        backend={
          isTouchDevice() ? TouchBackend : HTML5Backend
        }
        key={1}
      >
        <DocumentViewer>
          {(appendViewerToEach) => (
            <DirectorySort>
              {(
                { files = [], siblings = [] },
                SortingComponent,
              ) => (
                <DirectoryView defaultView={initialView}>
                  {(Component, SwitcherComponent) => (
                    <>
                      <DropZoneWrapper onDrop={onDrop} />
                      <Box
                        className={classnames(
                          cls.toolbar,
                          'q3-toolbar',
                        )}
                      >
                        <Box>
                          <DropZoneInputWrapper
                            onDrop={onDrop}
                          />
                          <DirectoryAddFolder />
                        </Box>
                        <Box className={cls.mobileActions}>
                          <SwitcherComponent />
                          <SortingComponent />
                          <DirectoryToolbar />
                        </Box>
                      </Box>
                      <DirectoryBreadcrumbs />
                      <DirectoryPendingFiles
                        pending={pending}
                      />
                      <Component
                        files={appendViewerToEach(files)}
                        siblings={siblings}
                      />
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
