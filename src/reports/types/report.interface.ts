import { IWorksheet } from './worksheet.interface';

export interface IReport {
  title: string;
  creator: string;
  lastModifiedBy: string;
  created: Date;
  modified: Date;
  lastPrinted: Date;
  company: string;
  description: string;
  keywords: string;
  fileName?: string;
  worksheets: IWorksheet[];
}
