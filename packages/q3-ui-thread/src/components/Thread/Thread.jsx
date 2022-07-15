import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import Sort from '../Sort';
import Tags from '../Tags';
import { ThreadContextProvider } from '../ThreadContext';
import ThreadNotes from '../ThreadNotes';
import withAlertAuthentication from '../withAlertAuthentication';
import NoteForm from '../NoteForm';

const ProtectedThreadNotes =
  withAlertAuthentication(ThreadNotes);

const Thread = (props) => (
  <Container maxWidth="xl">
    <Typography variant="h2">Thread</Typography>
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
          <>
            <Box
              bgcolor="background.paper"
              position="sticky"
              top="0"
            >
              <NoteForm data={data} onSubmit={post} />
              <Sort
                sortDirection={sortDirection}
                changeSortDirection={changeSortDirection}
              />
              Download
            </Box>
            <Tags
              data={data}
              selectTag={selectTag}
              tags={tags}
            />
          </>
        )}
      </ProtectedThreadNotes>
    </ThreadContextProvider>
  </Container>
);

export default Thread;
