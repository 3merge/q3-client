import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import useRest, { getCSV } from 'q3-ui-rest';
import Table from 'q3-ui/lib/table';
import Header from 'q3-ui/lib/header';
import SearchBar from 'q3-ui/lib/searchBar';
import { Create as CreateDialog } from 'q3-ui/lib/dialogs';
import { useAuth } from 'q3-ui-permissions';

const List = ({
  addComponent: AddComponent,
  resourceName,
  resourceNameSingular,
  coll,
  name,
  columns,
  ...rest
}) => {
  const { Hide, Redirect, canDelete } = useAuth(coll);
  const { t } = useTranslation();
  const state = useRest({
    url: `/${name}`,
    key: resourceNameSingular,
    pluralized: resourceName,
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
            poll={state.get}
            rows={get(state, resourceName, [])}
            columns={columns}
            mark={state.patch}
            deleteMany={canDelete ? state.removeBulk : null}
            downloadMany={(ids) =>
              getCSV(`/${name}?_id=${ids.join(',')}`)
            }
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
