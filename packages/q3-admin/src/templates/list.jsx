/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import useRest, { getCSV } from 'q3-ui-rest';
import Table from 'q3-ui/lib/table';
import TableActionBar from 'q3-ui/lib/tableActionBar';
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import { useAuth } from 'q3-ui-permissions';
import Context from './state';
import { isArray } from './utils';

export const getCSVByName = (name) => (ids = []) =>
  getCSV(`/${name}?_id=${ids.join(',')}`);

/*

 downloadMany={getCSVByName}
          deleteMany={
            canDelete && removeBulk ? removeBulk : null
          } */

const List = ({ children }) => {
  const {
    resourceName,
    resourceNameSingular,
    collectionName,
  } = React.useContext(Context);

  const { Redirect } = useAuth(collectionName);
  const state = useRest({
    url: `/${collectionName}`,
    key: resourceNameSingular,
    pluralized: resourceName,
    runOnInit: true,
  });

  return (
    <Redirect op="Read" to="/">
      <TableActionBar
        actions={[
          {
            icon: FileCopy,
            onClick: getCSVByName(collectionName),
            label: 'Export',
          },
          {
            icon: DeleteSweep,
            onClick: getCSVByName(collectionName),
            label: 'Delete',
          },
        ]}
      >
        <Container maxWidth="xl">
          <Box my={2}>
            <Table
              name={resourceName}
              loading={state.fetching}
              rows={get(state, resourceName, [])}
              columns={isArray(children)
                .map((child) => child.props.include)
                .filter(Boolean)}
            />
          </Box>
        </Container>
      </TableActionBar>
    </Redirect>
  );
};

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default List;
