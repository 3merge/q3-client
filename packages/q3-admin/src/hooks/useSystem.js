import React from 'react';
import axios from 'axios';
import { object } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';

const useSystem = (id) => {
  const [init, setInit] = React.useState(false);
  const [settings, setSettings] = React.useState({});
  const { collectionName } = React.useContext(Definitions);

  const updateSys = (args) =>
    object.noop(
      axios.post(`/sys/${id}`, args).then(({ data }) => {
        setSettings(data);
      }),
    );

  React.useEffect(() => {
    if (!init)
      object
        .noop(
          axios.get(`/sys/${id}`).then(({ data }) => {
            setSettings(data);
            setInit(true);
          }),
        )
        .then(() => {
          setInit(true);
        });
  }, [collectionName]);

  return {
    init,
    settings,
    updateSys,
  };
};

export default useSystem;
