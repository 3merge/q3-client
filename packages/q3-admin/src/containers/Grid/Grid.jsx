/* eslint-disable no-param-reassign */
import React from 'react';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { get, map } from 'lodash';
import { FilterChip } from 'q3-components';
import CardActionArea from '@material-ui/core/CardActionArea';
import TableIo from '../TableIo';
import { Definitions, Store } from '../state';
import TableHeader from '../TableHeader';
import { useAppContext } from '../../hooks';

const assignUrlPath = (base) => (item) => {
  // property changed in previous update
  // now it's always "photo" from the API
  if (item && item.photo) item.imgSrc = item.photo;

  return {
    ...item,
    url: `${base}/${item.id}`,
  };
};

const removeUrlPath = (filterUrl) => (item) => {
  if (filterUrl) delete item.url;
  return item;
};

export const TableDecorator = (props) => ({
  build: () => props,

  makeBlacklist: (fn) =>
    [
      ...get(props, 'allColumns', []),
      ...get(props, 'defaultColumns', []),
    ].filter((v) => !fn(v)),

  makeLinks: (root, removeUrl) =>
    get(props, 'data', [])
      .map(assignUrlPath(root))
      // sometimes, the URL is assigned from another module
      // even if we skipped the map above, it wouldn't ensure the URL prop removal
      .map(removeUrlPath(removeUrl)),
});

const List = ({
  addComponent,
  HeaderProps,
  disableLink,
  disableSearch,
  searchComponent,
  io,
  ...rest
}) => {
  const tableProps = React.useContext(Store);

  const { can } = useAppContext({
    io: <TableIo io={io} data={tableProps.data} />,
    add: addComponent,
  });

  const { rootPath } = React.useContext(Definitions);

  const decorator = TableDecorator({
    ...rest,
    ...tableProps,
  });

  return (
    <>
      <TableHeader>
        <Grid
          alignItems="center"
          justify="flex-end"
          container
        >
          <Grid item> {searchComponent}</Grid>
          <Grid item>{can('io')}</Grid>
          <Grid item>{can('add')}</Grid>
        </Grid>
      </TableHeader>

      <Box py={0.5}>
        <FilterChip />
      </Box>
      <Grid container spacing={1}>
        {map(
          decorator.makeLinks(rootPath, disableLink),
          (item) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box bgcolor="background.paper">
                <Card>
                  <CardActionArea
                    component={Link}
                    to={item.url}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          ),
        )}
      </Grid>
    </>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
