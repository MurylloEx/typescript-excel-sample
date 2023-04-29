import { join } from 'path';
import { faker } from '@faker-js/faker/locale/pt_BR';
import {
  ReportBuilder,
  WorksheetBuilder,
  ReportRowBuilder,
  XlsxReportSerializer,
  CsvReportSerializer,
  ReportColumnBuilder,
  IReportCellOptions
} from './reports';

const HeaderOptions: Partial<IReportCellOptions> = {
  font: {
    bold: true,
    size: 12,
    color: { argb: 'ffffffff' }
  },
  fill: {
    fgColor: { argb: 'ff000000' }
  }
}

const idColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(40)
  .withKey('id')
  .build();

const nameColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(48)
  .withKey('name')
  .build();

const birthdateColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(24)
  .withKey('birthdate')
  .build();

const creationColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(24)
  .withKey('creation')
  .build();

const emailColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(40)
  .withKey('email')
  .build();

const phoneColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(18)
  .withKey('phone')
  .build();

const addressColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(36)
  .withKey('address')
  .build();

const countryColumn = new ReportColumnBuilder()
  .withHorizontalAlignment('center')
  .withVerticalAlignment('middle')
  .withWidth(18)
  .withKey('country')
  .build();

const headerRow = new ReportRowBuilder()
  .addCell('User ID', HeaderOptions)
  .addCell('User Name', HeaderOptions)
  .addCell('User Birthdate', HeaderOptions)
  .addCell('User Creation', HeaderOptions)
  .addCell('User Email', HeaderOptions)
  .addCell('User Phone', HeaderOptions)
  .addCell('User Address', HeaderOptions)
  .addCell('User Country', HeaderOptions)
  .build();

const worksheetBuilder = new WorksheetBuilder()
  .withName('Active Users')
  .addColumn(idColumn)
  .addColumn(nameColumn)
  .addColumn(birthdateColumn)
  .addColumn(creationColumn)
  .addColumn(emailColumn)
  .addColumn(phoneColumn)
  .addColumn(addressColumn)
  .addColumn(countryColumn)
  .addRow(headerRow);

Array.from({ length: 1024 }).forEach(() => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  worksheetBuilder.addRow(
    new ReportRowBuilder()
      .addCell(faker.datatype.uuid())
      .addCell(faker.name.fullName({ firstName, lastName }))
      .addCell(faker.date.birthdate().toLocaleString())
      .addCell(faker.date.recent(2).toLocaleString())
      .addCell(faker.internet.email(firstName, lastName))
      .addCell(faker.phone.number('+55 (9) ####-####'))
      .addCell(faker.address.streetAddress(true))
      .addCell('Brasil')
      .build()
  );
});

const report = new ReportBuilder()
  .withTitle('Title')
  .withDescription('Description')
  .withCompanyName('Company')
  .withKeywords(['company', 'report', 'product'])
  .withAuthorName('Author')
  .withModifierName('Author')
  .withCreatedAt(new Date())
  .withModifiedAt(new Date())
  .withPrintedAt(new Date())
  .withFileName('report')
  .addWorksheet(worksheetBuilder.build())
  .build();

(async () => {
  const xlsxSerializer = new XlsxReportSerializer(report);
  const csvSerializer = new CsvReportSerializer(report);

  await xlsxSerializer.writeToDisk(join(__dirname, '../docs'));
  await csvSerializer.writeToDisk(join(__dirname, '../docs'));
})();
