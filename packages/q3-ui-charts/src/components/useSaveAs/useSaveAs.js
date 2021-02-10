import saveAs from 'file-saver';
import Exports from 'q3-exports';

export default (name, data) => {
  const toLowerCase = (str) =>
    String(str).toLowerCase().replace(/\s/g, '-');

  const handleExport = (type) => () => {
    const file = [toLowerCase(name), type].join('.');
    return new Exports(type)
      .toBuffer(data)
      .then((buf) => saveAs(buf, file));
  };

  return {
    csv: handleExport('csv'),
    xlsx: handleExport('xlsx'),
  };
};
