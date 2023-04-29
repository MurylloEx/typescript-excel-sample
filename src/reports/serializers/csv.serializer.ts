import { join } from 'path';
import { Workbook } from 'exceljs';
import { IReport, IReportSerializer } from '../types';

export class CsvReportSerializer implements IReportSerializer {

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

      builtWorksheet.columns = worksheet.columns.map((column) => ({
        header: column.text,
        key: column.key,
      }));

      for (const currentRow of worksheet.rows) {
        const row = builtWorksheet.addRow([]);

        currentRow.cells.map(({ value }, index) => {
          const cell = row.getCell(index + 1);
          cell.value = value;
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
    await workbook.csv.writeFile(join(path, this.report.fileName + '.csv'));
  }

}
