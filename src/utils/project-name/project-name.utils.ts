import * as fs from 'fs-extra';
import * as path from 'path';

export function getProjectName(): string {
  try {
    // Get the path to the package.json file
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    // Read the package.json file
    const packageJsonData = fs.readJsonSync(packageJsonPath);

    // Return the project name from the package.json
    return packageJsonData.name;
  } catch (error: any) {
    console.error('Error reading package.json:', error.message);
    throw error;
  }
}
