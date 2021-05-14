import React from 'react';
import useRest from 'q3-ui-rest';
import { find } from 'lodash';
import {
  Button,
  IconButton,
  Box,
  CircularProgress,
} from '@material-ui/core';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import { useToggle } from 'useful-state';
import DocsSelect from '../DocsSelect';
import Editor from '../Editor';
import View from '../View';
import Welcome from '../Welcome';

const Docs = () => {
  const r = useRest({
    url: '/documentation',
    key: 'document',
    pluralized: 'documents',
    runOnInit: true,
  });

  if (r.fetching)
    return (
      <Box align="center" my={4}>
        <CircularProgress />
      </Box>
    );

  if (r.fetchingError) return 'Document ISSUE';

  return (
    <DocsSelect {...r}>
      {(id) => {
        const { state, toggle } = useToggle();
        const d = find(
          r.documents,
          (doc) => String(doc.id) === String(id),
        );

        if (!d && id) return '404';
        if (!id) return <Welcome />;

        return !state ? (
          <View {...d}>
            <Box align="right" textAlign="right">
              <IconButton onClick={toggle}>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          </View>
        ) : (
          <>
            <Box align="right" textAlign="right" mb={2}>
              <Button onClick={toggle}>
                Close editor{' '}
                <CloseIcon
                  style={{ marginLeft: '.5rem' }}
                />
              </Button>
            </Box>
            <Editor
              {...d}
              onSubmit={(args) =>
                r.patch(id)(args).then(toggle)
              }
            />
          </>
        );
      }}
    </DocsSelect>
  );
};

export default Docs;
