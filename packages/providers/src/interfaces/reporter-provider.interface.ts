import { Observer } from 'rxjs';

export interface IReportEntry {
  label: string;
  value: string | number;
}

export interface IReportState {
  [entry: string]: IReportEntry;
}

export interface IReporterProvider {
  report: (reportState: IReportState) => (
    Promise<string> | Observer<string> | string | void
  );
}
