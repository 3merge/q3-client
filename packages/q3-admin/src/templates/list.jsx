import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import useRest from 'q3-ui-rest';
import Table from 'q3-ui/table';
import Header from 'q3-ui/header';
import SearchBar from 'q3-ui/searchBar';
import { Create as CreateDialog } from 'q3-ui/dialogs';
import { useAuth } from 'q3-ui-permissions';

const List = ({
  addComponent: AddComponent,
  resourceName,
  coll,
  name,
  columns,
  ...rest
}) => {
  const { Hide, Redirect } = useAuth(coll);
  const { t } = useTranslation();
  const state = useRest({
    url: `/${name}`,
    key: resourceName,
    runOnInit: true,
    ...rest,
  });

  return (
    <Redirect op="Read" to="/">
      <Header
        name={t(`titles:${resourceName}`)}
        renderRight={() => (
          <div style={{ display: 'flex' }}>
            <SearchBar expanded />
            {AddComponent && (
              <Hide op="Create">
                <CreateDialog
                  render={(done) => (
                    <AddComponent done={done} {...state} />
                  )}
                />
              </Hide>
            )}
          </div>
        )}
      />
      <Container>
        <Box my={6}>
          <Table
            {...rest}
            {...state}
            data={state}
            name={resourceName}
            loading={state.fetching}
            rows={get(state, resourceName, [])}
            columns={columns}
          />
        </Box>
      </Container>
    </Redirect>
  );
};

List.propTypes = {
  addComponent: PropTypes.node,
  fetching: PropTypes.bool,
  name: PropTypes.string.isRequired,
  coll: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  enablePost: PropTypes.bool,
  totalDocs: PropTypes.number,
  post: PropTypes.func.isRequired,
};

List.defaultProps = {
  addComponent: () => null,
  fetching: false,
  enablePost: false,
  totalDocs: 0,
};

export default List;
