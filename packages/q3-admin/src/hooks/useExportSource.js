import React from 'react';
import axios from 'axios';
// import Headers from 'q3-ui-permissions/lib/utils/header';
import socket from 'socket.io-client';

export default (host) => {
  const [list, setList] = React.useState([]);
  const [error, setError] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const ROOT_DIR = '/exports';

  const markAsSeen = (id) =>
    axios.post(`${ROOT_DIR}/${id}`).then(() => {
      setList((prev) =>
        prev.map((item) => {
          if (id === item._id)
            Object.assign(item, {
              hasDownloaded: true,
            });

          return item;
        }),
      );
    });

  React.useEffect(() => {
    if (!host) return;

    /*

    const io = socket(host);

    io.on('event', (data) => {
      setList(data.data);
    });

    axios
      .get('/exports')
      .then(({ data }) => {
        setList(data.data);
        setFetching(false);
      })
      .catch((e) => {
        setError(e);
        setFetching(false);
      }); */
  }, []);

  return {
    list,
    markAsSeen,
    fetching,
    error,
  };
};
