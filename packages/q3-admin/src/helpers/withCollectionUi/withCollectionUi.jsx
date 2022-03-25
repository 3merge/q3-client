import React from 'react';
import { map, size, find } from 'lodash';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';

const withCollectionUi =
  (Component, args = {}) =>
  (props) => {
    const { ui, uis = [] } = args;
    const { cached, change } = useCollectionUiLocalStorage(
      size(uis) ? uis[0]?.ui : ui,
      [map(uis, 'ui'), ui],
    );

    const [settledUi, setSettledUi] =
      React.useState(cached);

    React.useEffect(() => {
      change(settledUi);
    }, [settledUi]);

    return React.useMemo(
      () => (
        <Component
          {...args}
          {...find(uis, (uix) => uix?.ui === settledUi)}
          {...props}
          ui={settledUi}
          uis={map(uis, (item) => ({
            label: item.ui,
            onClick: () => setSettledUi(item.ui),
            selected: item.ui === settledUi,
          }))}
        />
      ),
      [settledUi],
    );
  };

export default withCollectionUi;
