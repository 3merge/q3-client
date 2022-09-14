import React from 'react';
import { map } from 'lodash';
import { Calendar, Table } from '../../containers';
import { Definitions } from '../../containers/state';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';

const UndefinedListElement = () => (
  <div>Missing UI configuration</div>
);

const CollectionUiResolver = (props) => {
  const { uis = [] } = React.useContext(Definitions);
  const { ui } = useCollectionUiLocalStorage(
    'table',
    map(uis, 'name'),
  );

  const ListElement = React.useMemo(() => {
    if (ui === 'table') return Table;
    if (ui === 'calendar') return Calendar;
    return ui || UndefinedListElement;
  }, [ui]);

  return <ListElement {...props} />;
};

export default CollectionUiResolver;
