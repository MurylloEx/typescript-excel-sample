import { IReportCell, IReportCellOptions, IReportRow } from '../types';

export class ReportRowBuilder {

  protected cells: IReportCell[] = [];

  addCell(value: string | number | Date, options?: Partial<Omit<IReportCellOptions, 'type' | 'pattern'>>) {
    this.cells.push({
      value,
      options: {
        font: options?.font,
        fill: options?.fill
      }
    });
    return this;
  }

  build(): IReportRow {
    return {
      cells: this.cells
    };
  }

}
