import React from 'react';
import { Box, Container, Paper } from '@material-ui/core';
import AuthSource from './AuthSource';
import RestSource from './RestSource';

// eslint-disable-next-line
export default ({ children, ...props }) => (
  <Paper>
    <Box py={4}>
      <Container>
        <RestSource {...props}>
          <AuthSource {...props}>
            {React.cloneElement(children, {
              collectionName: 'testing',
              id: '1',
              templates: [
                'testing template',
                'testing template 1',
              ],
            })}
          </AuthSource>
        </RestSource>
      </Container>
    </Box>
  </Paper>
);
