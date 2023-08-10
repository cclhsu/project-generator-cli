import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

const logger: Logger = new Logger('PathUtils');

/**
 * Resolves the ${HOME} placeholder in the given path.
 * @param filePath - The file path that may contain the ${HOME} placeholder.
 * @returns The resolved file path.
 */
export function resolveHomePath(filePath: string): string {
  if (typeof filePath === 'string' && filePath.includes('${HOME}')) {
    try {
      const homeDir = os.homedir() as string;
      const resolvedPath = filePath.replace('${HOME}', homeDir);
      return path.normalize(resolvedPath);
    } catch (error: any) {
      logger.log(`Could not resolve \${HOME} in ${filePath}: ${error.message}`);
      return filePath;
    }
  } else {
    return filePath;
  }
}

/**
 * Resolves the ~ placeholder in the given path.
 * @param filePath - The file path that may start with the ~ placeholder.
 * @returns The resolved file path.
 */
export function resolveTildeInPath(filePath: string): string {
  if (typeof filePath === 'string' && filePath.startsWith('~')) {
    const resolvedPath = path.join(os.homedir(), filePath.slice(1));
    return path.normalize(resolvedPath);
  }
  return filePath;
}
