import {
  IExchangeProvider,
  IFormatterProvider,
  IInstrumentProvider,
  IReporterProvider,
} from '@matex/providers';

export interface IMatexConfig {
  exchangeProvider?: IExchangeProvider;
  formatterProvider?: IFormatterProvider;
  reporterProvider?: IReporterProvider;
  instrumentProvider?: IInstrumentProvider;
}
