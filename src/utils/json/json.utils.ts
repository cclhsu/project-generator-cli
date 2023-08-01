import * as fs from 'fs';

export function readArrayFromJSON<T>(filePath: string): T[] {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData) as T[];
  } catch (error: any) {
    console.error('Error reading JSON file:', error.message);
    return [];
  }
}

export function writeArrayToJSON<T>(filePath: string, data: T[]): void {
  const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true });
  }
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
}

export function readSingleFromJSON<T>(filePath: string): T {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData) as T;
  } catch (error: any) {
    console.error('Error reading JSON file:', error.message);
    return {} as T;
  }
}

export function writeSingleToJSON<T>(filePath: string, data: T): void {
  const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true });
  }
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
}

// npm install fs js-yaml csv-parser csv-writer
// npm install --save-dev @types/fs @types/js-yaml @types/csv-parser @types/csv-writer
