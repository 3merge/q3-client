import React from 'react';
import { isFunction } from 'lodash';
import { Calendar, Table } from '../../containers';

const UndefinedListElement = () => (
  <div>Missing UI configuration</div>
);

const CollectionUiResolver = (props) => {
  // eslint-disable-next-line
  const { ui } = props;

  const ListElement = React.useMemo(() => {
    if (!ui || ui === 'table') return Table;
    if (ui === 'calendar') return Calendar;
    if (isFunction(ui)) return ui(props);
    return UndefinedListElement;
  }, [ui]);

  return <ListElement {...props} />;
};

export default CollectionUiResolver;
