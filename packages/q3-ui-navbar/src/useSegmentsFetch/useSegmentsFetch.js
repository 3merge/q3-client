import React from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { object } from 'q3-ui-helpers';
import { AuthContext } from 'q3-ui-permissions';

const useSegmentsFetch = () => {
  const [data, setData] = React.useState([]);
  const [init, setInit] = React.useState(false);
  const endpoint = '/system-segments';

  const enabled = get(
    React.useContext(AuthContext),
    'state.profile.developer',
    false,
  );

  // no matter what happens, let's move on
  const handleRequest = (pendingPromise) =>
    object.noop(pendingPromise).then(() => {
      setInit(true);
    });

  const update = (body) =>
    handleRequest(
      axios.put(endpoint, body).then((response) => {
        const { collectionName } = body;
        const updatedSegments = get(
          response,
          'data.segments',
          [],
        );

        setData((prevState) => [
          ...prevState.filter(
            (item) =>
              // will do a full swap
              item.collectionName !== collectionName,
          ),
          ...updatedSegments,
        ]);
      }),
    );

  React.useEffect(() => {
    if (!init)
      handleRequest(
        axios
          .get(endpoint)
          .then((response) =>
            setData(get(response, 'data.segments', [])),
          ),
      );
  }, []);

  return {
    data,
    update,
    enabled,
    init,
  };
};

export default useSegmentsFetch;
