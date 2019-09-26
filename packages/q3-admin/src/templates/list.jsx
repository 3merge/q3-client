import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Container from '@material-ui/core/Container';
import { useRest } from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import { Components } from 'q3-ui';

const { Table, Header } = Components;

const List = ({
  rowComponent: RowComponent,
  addComponent: AddComponent,
  name,
  headers,
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
        breadcrumbs
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
          header={headers ? headers(t) : []}
          rowTemplate={RowComponent}
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
  title: PropTypes.string.isRequired,
  rowComponent: PropTypes.node.isRequired,
  addComponent: PropTypes.node,
  fetching: PropTypes.bool,
  name: PropTypes.string.isRequired,
  headers: PropTypes.func.isRequired,
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
