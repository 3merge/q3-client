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
        total,
        selectTag,
        sortDirection,
        tags,
        post,
      }) => (
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          py={0.5}
          zIndex={1}
        >
          <NoteAdd post={post} />
          {total > 0 && (
            <Box alignItems="center" display="flex">
              <Sort
                sortDirection={sortDirection}
                changeSortDirection={changeSortDirection}
              />
              <Tags selectTag={selectTag} tags={tags} />
            </Box>
          )}
        </Box>
      )}
    </ProtectedThreadNotes>
  </ThreadContextProvider>
);

export default Thread;
