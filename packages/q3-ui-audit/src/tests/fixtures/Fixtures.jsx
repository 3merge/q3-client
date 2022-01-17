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
              data: {
                id: '1234',
                foo: '123',
                bar: '324324',
              },
              templates: {
                foo: 'foo,bar',
              },
            })}
          </AuthSource>
        </RestSource>
      </Container>
    </Box>
  </Paper>
);
