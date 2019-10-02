const baseURL =
  'https://raw.githubusercontent.com/tyrcord/tbase/master/financial/instruments';

export const Config = {
  fileName: 'instruments.json',
  projects: {
    matex: {
      destination: 'packages/providers/src/meta',
    },
    matex_dart: {
      destination: '',
    },
  },
  supportedProjects: ['matex', 'matex_dart'],
  urls: [
    `${baseURL}/commodoties.json`,
    `${baseURL}/cryptos.json`,
    `${baseURL}/currencies.json`,
    `${baseURL}/metadata.json`,
  ],
};
