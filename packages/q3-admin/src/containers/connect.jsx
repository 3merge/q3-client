import React from 'react';
import { get } from 'lodash';
import { object } from 'q3-ui-helpers';
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
    <Component
      data={data}
      id={id}
      name={name}
      collectionName={collectionName}
      onDelete={remove()}
      onSubmit={patch()}
      createdBy={createdBy}
      directoryPath={directoryPath}
      {...rest}
    />
  );
};
