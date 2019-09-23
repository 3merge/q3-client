import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Table } from '../../components';
import Page from '../page';

const List = ({
  rowComponent: RowComponent,
  addComponent: AddComponent,
  fetching: loading,
  name,
  headers,
  enablePost,
  totalDocs,
  data,
  post,
}) => {
  const { t } = useTranslation();

  return (
    <Page title={t(`titles:${name}`)}>
      <Table
        total={totalDocs}
        loading={loading}
        rows={get(data, name, [])}
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
    </Page>
  );
};

List.propTypes = {
  rowComponent: PropTypes.node.isRequired,
  addComponent: PropTypes.node,
  fetching: PropTypes.bool,
  name: PropTypes.string.isRequired,
  headers: PropTypes.func.isRequired,
  enablePost: PropTypes.bool,
  totalDocs: PropTypes.number,
  data: PropTypes.object.isRequired,
  post: PropTypes.func.isRequired,
};

List.defaultProps = {
  addComponent: null,
  fetching: false,
  enablePost: false,
  totalDocs: 0,
};

export default List;
