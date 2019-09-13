export type LotDescriptor = {
  exists: boolean;
  multiplier: number;
};

export type LotDescriptors = {
  lot: LotDescriptor;
  microLot: LotDescriptor;
  miniLot: LotDescriptor;
  nanoLot: LotDescriptor;
};

export const defaultLotDescriptors: LotDescriptors = Object.freeze({
  lot: {
    exists: true,
    multiplier: 100_000,
  },
  microLot: {
    exists: true,
    multiplier: 1_000,
  },
  miniLot: {
    exists: true,
    multiplier: 10_000,
  },
  nanoLot: {
    exists: true,
    multiplier: 100,
  },
});
