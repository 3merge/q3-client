import FileName from '../FileName';
import withRenderFile from '../withRenderFile';

export default withRenderFile(
  FileName,
  (directoryNodes, fileNodes) => [
    directoryNodes,
    fileNodes,
  ],
);
