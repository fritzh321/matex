import { IFormatterProvider } from './interfaces/formatter-provider.interface';
import * as InstrumentsMetadata from './meta/instruments.json';

export class FormatterProvider implements IFormatterProvider {
  public formatInstrument(value: number, code: string, locale: string) {
    const instrumentMetadata = InstrumentsMetadata[code];

    if (instrumentMetadata) {
      const { format } = instrumentMetadata;

      return new Intl.NumberFormat(locale, {
        currency: code,
        maximumFractionDigits: format.round,
        minimumFractionDigits: format.round,
        style: 'currency',
      }).format(value);
    }

    return void 0;
  }

  public formatQuote(value: number, code: string, locale: string) {
    const instrumentMetadata = InstrumentsMetadata[code];

    if (instrumentMetadata) {
      const { pip } = instrumentMetadata;

      return new Intl.NumberFormat(locale, {
        currency: code,
        maximumFractionDigits: pip.round,
        minimumFractionDigits: pip.round,
        style: 'currency',
      }).format(value);
    }

    return void 0;
  }
}
