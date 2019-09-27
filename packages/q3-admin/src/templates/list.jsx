import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Link from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Home from '@material-ui/icons/Home';
import { useRest } from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import { Components } from 'q3-ui';

const {
  CreateDialog,
  SearchBar,
  Table,
  Header,
} = Components;

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

  return (
    <>
      <Header
        name={t(`titles:${name}`)}
        renderRight={() => (
          <div style={{ display: 'flex' }}>
            <SearchBar expanded />
            {AddComponent && (
              <CreateDialog
                render={() => <AddComponent {...state} />}
              />
            )}
          </div>
        )}
      />
      <Container>
        <Table
          {...rest}
          {...state}
          data={state}
          name={name}
          loading={state.fetching}
          rows={get(state, name, [])}
          columns={columns}
        />
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
