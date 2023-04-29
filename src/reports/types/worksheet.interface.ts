import { IReportColumn } from './report-column.interface';
import { IReportRow } from './report-row.interface';

export interface IWorksheet {
  name: string;
  password?: string;
  rows: IReportRow[];
  columns: IReportColumn[];
}
