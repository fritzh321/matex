import { IInstrumentProvider } from './interfaces';
import * as InstrumentsMetadata from './meta/instruments.json';

export class InstrumentProvider implements IInstrumentProvider {
  public metadata(code: string) {
    return InstrumentsMetadata[code];
  }
}
