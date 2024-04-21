import ExcelJs from 'exceljs';

const workbook = new ExcelJs.Workbook();

export async function readExcelFile(filepath: string, excelType = 'xlsx') {
  return await workbook[excelType].readFile(filepath);
}
