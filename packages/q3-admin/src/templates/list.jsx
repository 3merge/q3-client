import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { useRest } from 'q3-ui-rest';
import Table from 'q3-ui/table';
import Header from 'q3-ui/header';
import SearchBar from 'q3-ui/searchBar';

const List = ({
  addComponent: AddComponent,
  name,
  columns,
  ...rest
}) => {
  const { t } = useTranslation();
  const state = useRest({
    url: `/${name}`,
    key: name,
    runOnInit: true,
    ...rest,
  });

  console.log(rest);

  return (
    <>
      <Header
        name={t(`titles:${name}`)}
        renderRight={() => (
          <div style={{ display: 'flex' }}>
            <SearchBar expanded />
          </div>
        )}
      />
      <Container>
        <Box my={6}>
          <Table
            {...rest}
            {...state}
            data={state}
            name={name}
            loading={state.fetching}
            rows={get(state, name, [])}
            columns={columns}
          />
        </Box>
      </Container>
    </>
  );
};

List.propTypes = {
  addComponent: PropTypes.node,
  fetching: PropTypes.bool,
  name: PropTypes.string.isRequired,
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
