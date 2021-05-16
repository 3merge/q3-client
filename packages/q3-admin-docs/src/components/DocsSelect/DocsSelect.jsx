import React from 'react';
import {
  Link,
  useLocation,
  useNavigate,
} from '@reach/router';
import { Add as AddIcon } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  Fab,
  List,
  ListItem,
  ListItemText,
  Container,
  ListSubheader,
  TextField,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import {
  groupBy,
  map,
  sortBy,
  isNil,
  size,
  lowerCase,
} from 'lodash';
import Search from '../Search';

const isEmpty = (xs) => isNil(xs) || !size(xs);

const addLocation = (xs, i) => {
  const copy = { ...xs };

  if (isEmpty(copy.location)) copy.location = 'Unassigned';

  if (isEmpty(copy.title))
    copy.location = i === 0 ? 'Untitled' : `Untited (${i})`;

  return copy;
};

const DocsSelect = ({ children, documents, post }) => {
  const { search, pathname } = useLocation();
  const id = new URLSearchParams(search).get('id');
  const [searchIds, setSearchIds] = React.useState([]);

  const navigate = useNavigate();

  const filter = (xs) =>
    setSearchIds(
      map(documents, JSON.stringify)
        .filter((item) => {
          return lowerCase(item).includes(lowerCase(xs));
        })
        .map(JSON.parse)
        .map((item) => item.id)
        .map(String),
    );

  const items = groupBy(
    map(sortBy(documents, 'title'), addLocation).filter(
      (item) => {
        return searchIds.includes(String(item.id));
      },
    ),
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
          <Search handleInput={filter} />
          {sortBy(
            Object.entries(items),
            ([key]) => key,
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
                    dense
                    selected={String(doc.id) === String(id)}
                    component={Link}
                    to={`?id=${doc.id}`}
                  >
                    <ListItemText
                      primary={doc.title || 'Untitled'}
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
          <Box bottom="1rem" right="1rem" position="fixed">
            <Fab
              color="primary"
              onClick={() =>
                post({}).then((data) => {
                  navigate(
                    `${pathname}?id=${data?.document?.id}`,
                  );
                })
              }
            >
              <AddIcon />
            </Fab>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DocsSelect;
