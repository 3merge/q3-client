import useRest from 'q3-ui-rest';

const useThread = (collectionName, id) =>
  useRest({
    url: `/${collectionName}/${id}/thread`,
    // because plural and key are otherwise the same
    key: 'thread',
    pluralized: 'thread',
    runOnInit: true,
  });

export default useThread;
