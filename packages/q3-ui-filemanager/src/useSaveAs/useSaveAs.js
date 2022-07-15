import FileSaver from 'file-saver';

const useSaveAs =
  ({ name, url }) =>
  () =>
    FileSaver.saveAs(url, name);

export default useSaveAs;
