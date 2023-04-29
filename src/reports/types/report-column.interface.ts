export type ColumnHorizontalAlignment = 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed';
export type ColumnVerticalAlignment = 'top' | 'middle' | 'bottom' | 'distributed' | 'justify';

export interface IReportColumn {
  key: string;
  text?: string;
  width?: number;
  horizontalAlignment: ColumnHorizontalAlignment;
  verticalAlignment: ColumnVerticalAlignment;
}
