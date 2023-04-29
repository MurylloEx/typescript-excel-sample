import { IReport, IWorksheet } from '../types';

export class ReportBuilder {

  protected title: string = '';
  protected authorName: string = '';
  protected modifierName: string = '';
  protected companyName: string = '';
  protected description: string = '';
  protected keywords: string = '';
  protected fileName?: string = undefined;
  protected createdAt: Date = new Date();
  protected modifiedAt: Date = new Date();
  protected printedAt: Date = new Date();
  protected worksheets: IWorksheet[] = [];

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  withAuthorName(authorName: string) {
    this.authorName = authorName;
    return this;
  }

  withModifierName(modifierName: string) {
    this.modifierName = modifierName;
    return this;
  }

  withCompanyName(companyName: string) {
    this.companyName = companyName;
    return this;
  }

  withKeywords(keywords: string[]) {
    this.keywords = keywords.join(',');
    return this;
  }

  withFileName(fileName: string) {
    this.fileName = fileName;
    return this;
  }

  withCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
    return this;
  }

  withModifiedAt(modifiedAt: Date) {
    this.modifiedAt = modifiedAt;
    return this;
  }

  withPrintedAt(printedAt: Date) {
    this.printedAt = printedAt;
    return this;
  }

  addWorksheet(worksheet: IWorksheet) {
    this.worksheets.push(worksheet);
    return this;
  }

  build(): IReport {
    return {
      title: this.title,
      creator: this.authorName,
      lastModifiedBy: this.modifierName,
      created: this.createdAt,
      modified: this.modifiedAt,
      lastPrinted: this.printedAt,
      company: this.companyName,
      description: this.description,
      keywords: this.keywords,
      fileName: this.fileName,
      worksheets: this.worksheets,
    }
  }

}
