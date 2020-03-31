import React from 'react';
import Tile from 'q3-ui/lib/tile';
import PersistWatcher from 'q3-ui-forms/lib/builders/persistWatcher';
import { get } from 'lodash';
import Comparision from 'comparisons';
import { Definitions, Dispatcher, Store } from './state';

export default (Component, opts = {}) => ({ name }) => {
  const { data } = React.useContext(Store);
  const { remove, patch } = React.useContext(Dispatcher);
  const { id, collectionName } = React.useContext(
    Definitions,
  );

  const { conditionals = [] } = opts;
  const sessionKey = `${name}-${id}`;

  const createdBy = get(
    data,
    'createdBy.id',
    get(data, 'createdBy', null),
  );

  if (!new Comparision(conditionals).eval(data))
    return null;

  return (
    <Tile title={name} subtitle={name}>
      <PersistWatcher filterById={sessionKey} />
      <Component
        data={data}
        id={id}
        name={name}
        collectionName={collectionName}
        onDelete={remove()}
        onSubmit={patch()}
        createdBy={createdBy}
      />
    </Tile>
  );
};
