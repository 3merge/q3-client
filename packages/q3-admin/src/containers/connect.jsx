import React from 'react';
import Tile from 'q3-ui/lib/tile';

import { get } from 'lodash';
import { object } from 'q3-ui-helpers';
import Breadcrumbs from 'q3-ui/lib/breadcrumbs';

import { Definitions, Dispatcher, Store } from './state';

export default (Component) => ({ name, ...rest }) => {
  const { data } = React.useContext(Store);
  const { remove, patch } = React.useContext(Dispatcher);
  const {
    id,
    collectionName,
    directoryPath,
  } = React.useContext(Definitions);

  const createdBy = get(
    data,
    'createdBy.id',
    get(data, 'createdBy', null),
  );

  if (!object.hasKeys(data)) return null;

  return (
    <Tile title={name} subtitle={name} divider>
      <Breadcrumbs />
      <Component
        data={data}
        id={id}
        name={name}
        collectionName={collectionName}
        onDelete={remove()}
        onSubmit={patch()}
        createdBy={createdBy}
        directoryPath={directoryPath}
        showPersistenceSnack
        {...rest}
      />
    </Tile>
  );
};
