import * as path from 'path';
import { Config } from './config';

export function findWorkingProject() {
  const cwd = process.cwd();
  const dirs = cwd.split(path.sep).reverse();
  let projectPath = cwd;
  let name;

  for (const dir of dirs) {
    if (Config.supportedProjects.includes(dir)) {
      name = dir;
      break;
    }

    projectPath = path.resolve(projectPath, '..');
  }

  return name
    ? {
        name,
        path: projectPath,
      }
    : null;
}
