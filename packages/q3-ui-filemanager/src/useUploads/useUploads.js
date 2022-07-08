import useRest from 'q3-ui-rest';

const useUploads = (collectionName, id) =>
  useRest({
    key: 'uploads',
    pluralized: 'uploads',
    url: `/${collectionName}/${id}/uploads`,
    runOnInit: false,
  });

export default useUploads;
