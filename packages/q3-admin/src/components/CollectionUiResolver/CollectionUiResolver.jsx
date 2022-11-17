import React from 'react';
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
    return ui || UndefinedListElement;
  }, [ui]);

  return <ListElement {...props} />;
};

export default React.memo(CollectionUiResolver);
