/* eslint-disable no-param-reassign */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FilterChip } from 'q3-components';
import { map } from 'lodash';
import TableIo from '../TableIo';
import { Store } from '../state';
import TableHeader from '../TableHeader';
import { useAppContext } from '../../hooks';
import useDataResolvers from '../../hooks/useDataResolvers';

const List = ({
  addComponent,
  searchComponent,
  templateComponent,
  disableSearch,
  io,
  resolvers,
  ...rest
}) => {
  const fn = useDataResolvers(resolvers, rest);
  const { data } = React.useContext(Store);
  const { can } = useAppContext({
    add: addComponent,
    io: <TableIo data={data} io={io} />,
  });

  const Template = (args) =>
    React.cloneElement(templateComponent, args);

  return (
    <Template data={map(data, fn)}>
      <TableHeader>
        <Grid
          alignItems="center"
          justify="flex-end"
          container
        >
          {!disableSearch && searchComponent && (
            <Grid item>{searchComponent}</Grid>
          )}
          <Grid item>{can('io')}</Grid>
          <Grid item>{can('add')}</Grid>
        </Grid>
      </TableHeader>
      <Box py={0.5}>
        <FilterChip />
      </Box>
    </Template>
  );
};

List.propTypes = {};
List.defaultProps = {};

export default List;
