import { IReporterProvider, IReportState } from './interfaces';

export class ReporterProvider implements IReporterProvider {
  public report(reportState: IReportState) {
    return this.stringify(reportState);
  }

  private stringify(reportState: IReportState) {
    const entries = Object.values(reportState);
    const { length } = entries;

    return entries.reduce((accumulator, { label, value }, index) => {
      return (accumulator += `${label} ${value}${
        index < length - 1 ? '\n' : ''
      }`);
    }, '');
  }
}
