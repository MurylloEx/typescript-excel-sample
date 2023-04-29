import {
  IReportColumn,
  ColumnHorizontalAlignment,
  ColumnVerticalAlignment
} from '../types';

export class ReportColumnBuilder {

  protected key: string = '';
  protected text?: string = undefined;
  protected width?: number = undefined;
  protected horizontalAlignment: ColumnHorizontalAlignment = 'left';
  protected verticalAlignment: ColumnVerticalAlignment = 'middle';

  withText(text: string) {
    this.text = text;
    return this;
  }

  withKey(key: string) {
    this.key = key;
    return this;
  }

  withWidth(width: number) {
    this.width = width;
    return this;
  }

  withHorizontalAlignment(horizontalAlignment: ColumnHorizontalAlignment) {
    this.horizontalAlignment = horizontalAlignment;
    return this;
  }
  
  withVerticalAlignment(verticalAlignment: ColumnVerticalAlignment) {
    this.verticalAlignment = verticalAlignment;
    return this;
  }

  build(): IReportColumn {
    return {
      text: this.text,
      key: this.key,
      width: this.width,
      horizontalAlignment: this.horizontalAlignment,
      verticalAlignment: this.verticalAlignment
    };
  }

}