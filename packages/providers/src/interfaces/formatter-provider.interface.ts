import { Observer } from 'rxjs';

type IFormatterProviderType = (
  Promise<string> | Observer<string> | string | void
);

export interface IFormatterProvider {
  formatInstrument?(
    value: number,
    code: string,
    locale: string,
  ): IFormatterProviderType;

  formatInstrument?(
    value: number,
    code: string,
    locale: string,
    minimumFractionDigits: number,
    maximumFractionDigits: number,
  ): IFormatterProviderType;

  formatQuote?(
    value: number,
    code: string,
    locale: string,
  ): IFormatterProviderType;

  formatQuote?(
    value: number,
    code: string,
    locale: string,
    minimumFractionDigits: number,
    maximumFractionDigits: number,
  ): IFormatterProviderType;
}
