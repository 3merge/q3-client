import useRest from 'q3-ui-rest';

const useThread = (collectionName, id) =>
  useRest({
    url: `/${collectionName}/${id}/thread`,
    key: 'thread',
    pluralized: 'thread',
    runOnInit: true,
  });

export default useThread;
