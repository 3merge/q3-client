import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Container from '@material-ui/core/Container';
import { useRest } from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import { Components } from 'q3-ui';

const { Table, Header } = Components;

const List = ({
  addComponent: AddComponent,
  name,
  columns,
  enablePost,
  post,
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
        search
        searchVisible
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
        {AddComponent && post && enablePost && (
          <div
            style={{
              position: 'fixed',
              right: 15,
              bottom: 15,
            }}
          >
            <AddComponent />
          </div>
        )}
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
  addComponent: null,
  fetching: false,
  enablePost: false,
  totalDocs: 0,
};

export default List;
