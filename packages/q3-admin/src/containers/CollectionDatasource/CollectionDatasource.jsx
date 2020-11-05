import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import Graphic from 'q3-ui-assets';
import { useDatasource } from 'q3-hooked';
import UnsavedChanges from '../UnsavedChanges';
import Loading from '../../components/loading';
import { Dispatcher, Store } from '../state';

const CollectionDatasource = ({
  children,
  loadingComponent,
  ...options
}) => {
  const {
    operations,
    store,
    hasEntered,
    hasError,
  } = useDatasource(options);

  return !hasEntered ? (
    loadingComponent || <Loading id={get(store, 'id')} />
  ) : (
    <Box>
      {hasError ? (
        <Box m={4}>
          <Graphic title="error" icon="Error" />
        </Box>
      ) : (
        <Dispatcher.Provider value={operations}>
          <Store.Provider value={store}>
            <UnsavedChanges
              onRefresh={() =>
                operations.poll(
                  get(store, 'location.search', ''),
                )
              }
            />
            {executeOnChildren(children, store)}
          </Store.Provider>
        </Dispatcher.Provider>
      )}
    </Box>
  );
};

CollectionDatasource.propTypes = {
  children: PropTypes.func.isRequired,
  loadingComponent: PropTypes.node,
};

CollectionDatasource.defaultProps = {
  loadingComponent: null,
};

export default CollectionDatasource;
