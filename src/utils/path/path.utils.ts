import * as os from 'os';
import * as path from 'path';

// Resolve the ${HOME} placeholder in the given path
export function resolveHomePath(filePath: string): string {
  // Check if the path contains the ${HOME} placeholder
  if (filePath.includes('${HOME}')) {
    try {
      // Get the user's home directory using the os.homedir() method
      const homeDir = os.homedir() as string;

      // Replace the ${HOME} placeholder with the actual home directory path
      const resolvedPath = filePath.replace('${HOME}', homeDir);

      // Normalize the path to handle any platform-specific path separators
      return path.normalize(resolvedPath);
    } catch (error: any) {
      console.log('Could not resolve ${HOME} in ${filePath}: ${error.message}');
      return filePath;
    }
  } else {
    // If the path does not contain the ${HOME} placeholder, return the original path
    return filePath;
  }
}
