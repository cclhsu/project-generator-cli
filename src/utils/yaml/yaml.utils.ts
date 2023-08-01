import * as fs from 'fs';
import * as yaml from 'js-yaml';

export async function readArrayFromYAML<T>(filePath: string): Promise<T[]> {
  try {
    const yamlData = fs.readFileSync(filePath, 'utf8');
    return yaml.load(yamlData) as T[];
  } catch (error: any) {
    console.error('Error reading YAML file:', error.message);
    return [];
  }
}

export async function writeArrayToYAML<T>(
  filePath: string,
  data: T[],
): Promise<void> {
  const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true });
  }
  const yamlData = yaml.dump(data);
  fs.writeFileSync(filePath, yamlData, 'utf8');
}

export async function readSingleFromYAML<T>(filePath: string): Promise<T> {
  try {
    const yamlData = fs.readFileSync(filePath, 'utf8');
    return yaml.load(yamlData) as T;
  } catch (error: any) {
    console.error('Error reading YAML file:', error.message);
    return {} as T;
  }
}

export async function writeSingleToYAML<T>(
  filePath: string,
  data: T,
): Promise<void> {
  const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true });
  }
  const yamlData = yaml.dump(data);
  fs.writeFileSync(filePath, yamlData, 'utf8');
}

// npm install fs js-yaml csv-parser csv-writer
// npm install --save-dev @types/fs @types/js-yaml @types/csv-parser @types/csv-writer
