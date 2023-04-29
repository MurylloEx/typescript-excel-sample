export interface IColor {
  argb: string;
  theme: number;
}

export interface IReportCellFill {
  fgColor: Partial<IColor>;
}

export interface IReportCellFont {
  name: string;
  size: number;
  family: number;
  scheme: 'minor' | 'major' | 'none';
  charset: number;
  color: Partial<IColor>;
  bold: boolean;
  italic: boolean;
  underline: boolean | 'none' | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting';
  vertAlign: 'superscript' | 'subscript';
  strike: boolean;
  outline: boolean;
}

export interface IReportCellOptions {
  font: Partial<IReportCellFont>;
  fill: IReportCellFill;
}

export interface IReportCell {
  value: string | number | Date;
  options: Partial<IReportCellOptions>;
}
