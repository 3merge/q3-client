import React from 'react';
import { Link, useLocation } from '@reach/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  List,
  ListItem,
  ListItemText,
  Container,
  ListSubheader,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { groupBy, map, sortBy } from 'lodash';

const DocsSelect = ({ children, documents }) => {
  const id = new URLSearchParams(useLocation()?.search).get(
    'id',
  );

  const items = groupBy(
    sortBy(documents, 'title'),
    'location',
  );

  return (
    <Grid
      container
      style={{
        height: 'var(--vh-offset-appbar)',
        borderTop: '1px solid',
        borderColor: 'var(--background-muted)',
      }}
    >
      <Grid
        item
        style={{
          width: '35vw',
          backgroundColor: '#f4f4f4',
          borderRight: '1px solid',
          borderColor: 'var(--background-muted)',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Box ml="auto" maxWidth="320px" p={1}>
          {sortBy(Object.entries(items), ([key]) =>
            key === 'undefined' ? 'A' : key,
          ).map(([group, docs]) => (
            <List
              subheader={
                <ListSubheader
                  disableSticky
                  component="div"
                  id="nested-list-subheader"
                >
                  {group === 'undefined'
                    ? 'Unassigned'
                    : group}
                </ListSubheader>
              }
            >
              {map(docs, (doc) => (
                <Box component="li" key={doc.id}>
                  <ListItem
                    button
                    selected={String(doc.id) === String(id)}
                    component={Link}
                    to={`?id=${doc.id}`}
                  >
                    <ListItemText
                      primary={doc.title}
                      secondary={string.toDate(
                        doc.updatedAt,
                      )}
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          ))}
        </Box>
      </Grid>
      <Grid
        item
        xs
        style={{
          backgroundColor: '#FFF',
          height: '100%',
        }}
      >
        <Box my={2}>
          <Container maxWidth="md">
            {children(id)}
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DocsSelect;
