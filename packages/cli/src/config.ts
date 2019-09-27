export const Config = {
  fileName: 'instruments.json',
  instrumentURL:
    'https://raw.githubusercontent.com/tyrcord/tbase/master/financial/instruments.json',
  projects: {
    matex: {
      destination: 'packages/providers/src/meta',
    },
    matex_dart: {
      destination: '',
    },
  },
  supportedProjects: ['matex', 'matex_dart'],
};
