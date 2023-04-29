import { join } from 'path';
import { Workbook } from 'exceljs';
import { IReport, IReportSerializer } from '../types';

export class XlsxReportSerializer implements IReportSerializer {
  
  constructor(private readonly report: IReport) {}

  protected async getWorkbook(): Promise<Workbook> {
    const workbook = new Workbook();

    workbook.title = this.report.title;
    workbook.description = this.report.description;
    workbook.company = this.report.company;
    workbook.keywords = this.report.keywords;
    workbook.created = this.report.created;
    workbook.modified = this.report.modified;
    workbook.lastPrinted = this.report.lastPrinted;
    workbook.creator = this.report.creator;
    workbook.lastModifiedBy = this.report.lastModifiedBy;

    for await (const worksheet of this.report.worksheets) {
      const builtWorksheet = workbook.addWorksheet(worksheet.name);

      if (worksheet.password) {
        builtWorksheet.protect(worksheet.password, {});
      }

      builtWorksheet.columns = worksheet.columns.map((column) => ({
        header: column.text,
        key: column.key,
        width: column.width,
        style: {
          alignment: {
            horizontal: column.horizontalAlignment,
            vertical: column.verticalAlignment
          }
        }
      }));

      for (const currentRow of worksheet.rows) {
        const row = builtWorksheet.addRow([]);

        currentRow.cells.map(({ value, options }, index) => {
          const cell = row.getCell(index + 1);

          cell.value = value;
          cell.font = options.font ?? cell.font;
          cell.fill = !options.fill ? cell.fill : {
            ...options.fill,
            type: 'pattern',
            pattern: 'solid'
          };
        });

        row.commit();
      }
    }

    return workbook;
  }

  async toBuffer(): Promise<Buffer> {
    const workbook = await this.getWorkbook();
    return Buffer.from(await workbook.csv.writeBuffer());
  }

  async writeToDisk(path: string): Promise<void> {
    const workbook = await this.getWorkbook();
    await workbook.xlsx.writeFile(join(path, this.report.fileName + '.xlsx'));
  }

}
