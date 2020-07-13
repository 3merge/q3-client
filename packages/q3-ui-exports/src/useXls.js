import saveAs from 'file-saver';
import * as ExcelJS from 'exceljs';

export default (data) => {
  const [header, ...body] = data;
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet();

  ws.columns = header.map((head) => ({
    header: head.toUpperCase(),
    key: head,
    width: 35,
  }));

  body.forEach((r) => {
    ws.addRow(r);
  });

  Object.assign(ws.getRow(1), {
    alignment: {
      vertical: 'middle',
    },
    border: {
      bottom: { style: 'thin' },
    },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'C7C7C7' },
    },
    font: { bold: true },
  });

  ws.properties.defaultRowHeight = 18;

  wb.xlsx.writeBuffer().then((buf) => {
    saveAs(new Blob([buf]), 'export.xlsx');
  });
};
