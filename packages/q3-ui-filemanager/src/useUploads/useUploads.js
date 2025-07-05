import axios from 'axios';
import useRest from 'q3-ui-rest';
import compress from 'browser-image-compression';
import { map } from 'lodash';

const useUploads = (collectionName, id) => {
  const apis = useRest({
    key: 'uploads',
    pluralized: 'uploads',
    url: `/${collectionName}/${id}/uploads`,
    runOnInit: false,
  });

  return {
    ...apis,
    compressFile,
    uploadS3,
  };

  async function compressFile(file) {
    try {
      return await compress(file, {
        maxSizeMB: 4.5,
        useWebWorker: true,
        maxWidthOrHeight: 1920,
      });
    } catch (e) {
      return file;
    }
  }

  async function uploadS3(files = [], folder = null) {
    await Promise.all(
      map(files, async (file) => {
        const compressed = await compressFile(file);
        const originalName = file.name;
        const { data: { url } } = await axios.post('/s3-upload', {
          collection:collectionName,
          id,
          mimetype: compressed.type,
          name: originalName,
        })

        // note: this is to skip put request in our local integration tests
        if (url !== 'https://example.com/s3-upload') {
          await axios.create().put(url, compressed)
        }

        const { data: { uploads = [] } } = await axios.post('/s3-upload-transfer', {
          collection: collectionName,
          id,
          name: folder
            ? `[${folder}]${originalName}`
            : originalName,
          size: compressed.size,
        })

        apis.replace({
          uploads,
        });
      })
    )
  }
}

export default useUploads;
