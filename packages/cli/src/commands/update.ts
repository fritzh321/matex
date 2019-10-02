import { logger } from '@tutils/logger';
import axios from 'axios';
import { promises as fs } from 'fs';
import * as path from 'path';

import { Config } from '../config';
import { findWorkingProject } from '../utils';

export async function update() {
  const projectInfo = findWorkingProject();

  if (projectInfo) {
    return fetchInstrumentsMedata()
      .then(instruments => {
        return fs.writeFile(
          path.join(
            projectInfo.path,
            Config.projects[projectInfo.name].destination,
            Config.fileName,
          ),
          JSON.stringify(instruments, null, 2),
        );
      })
      .catch(logger.error)
      .then(() => {
        logger.success('File instruments.json has been updated!');
      });
  } else {
    logger.error('Please run this command in a Matex project!');
  }
}

function fetchInstrumentsMedata() {
  const promises = [];

  for (const url of Config.urls) {
    promises.push(axios.get(url).then(({ data }) => data));
  }

  return Promise.all(promises).then(
    ([commodoties, cryptos, currencies, metadata]) => ({
      ...commodoties,
      ...cryptos,
      ...currencies,
      ...metadata,
    }),
  );
}
