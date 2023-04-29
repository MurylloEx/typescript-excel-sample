import { IWorksheet, IReportColumn, IReportRow } from '../types';

export class WorksheetBuilder {

  protected name: string = '';
  protected password?: string = undefined;
  protected columns: IReportColumn[] = [];
  protected rows: IReportRow[] = [];

  withName(name: string) {
    this.name = name;
    return this;
  }

  withPassword(password: string) {
    this.password = password;
    return this;
  }

  addColumn(column: IReportColumn) {
    this.columns.push(column);
    return this;
  }

  addRow(row: IReportRow) {
    this.rows.push(row);
    return this;
  }

  build(): IWorksheet {
    return {
      name: this.name,
      password: this.password,
      columns: this.columns,
      rows: this.rows,
    };
  }

}
