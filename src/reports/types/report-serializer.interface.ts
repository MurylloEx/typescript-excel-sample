export interface IReportSerializer {
  toBuffer(): Promise<Buffer>;
  writeToDisk(path: string): Promise<void>;
}
