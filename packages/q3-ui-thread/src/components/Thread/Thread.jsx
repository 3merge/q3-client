import React from 'react';
import { Box } from '@material-ui/core';
import Sort from '../Sort';
import Tags from '../Tags';
import { ThreadContextProvider } from '../ThreadContext';
import ThreadNotes from '../ThreadNotes';
import withAlertAuthentication from '../withAlertAuthentication';
import NoteAdd from '../NoteAdd';

const ProtectedThreadNotes =
  withAlertAuthentication(ThreadNotes);

const Thread = (props) => (
  <ThreadContextProvider {...props}>
    <ProtectedThreadNotes {...props}>
      {({
        changeSortDirection,
        data,
        selectTag,
        sortDirection,
        tags,
        post,
      }) => (
        <Box
          bgcolor="background.paper"
          display="flex"
          justifyContent="space-between"
          position="sticky"
          py={1}
          top="0"
          zIndex={1}
        >
          <NoteAdd data={data} post={post} />
          <Box>
            <Sort
              sortDirection={sortDirection}
              changeSortDirection={changeSortDirection}
            />
            <Tags
              data={data}
              selectTag={selectTag}
              tags={tags}
            />
          </Box>
        </Box>
      )}
    </ProtectedThreadNotes>
  </ThreadContextProvider>
);

export default Thread;
