import * as fs from 'fs';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

// Define a constraint for the generic type T to ensure it's an object
type ObjectMap<T> = { [key: string]: T };

export async function readArrayFromCSV<T>(filePath: string): Promise<T[]> {
  const entities: T[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: ObjectMap<any>) => {
        entities.push(row as T);
      })
      .on('end', () => {
        resolve(entities);
      })
      .on('error', (error: any) => {
        reject(error);
      });
  });
}

export async function writeArrayToCSV<T extends object>(
  filePath: string,
  data: T[],
): Promise<void> {
  const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true });
  }
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: Object.keys(data[0]).map((header) => ({
      id: header,
      title: header,
    })),
  });

  try {
    await csvWriter.writeRecords(data as ObjectMap<any>[]);
    console.log('CSV file written successfully.');
  } catch (error: any) {
    console.error('Error writing to CSV file:', error.message);
  }
}

export async function readSingleFromCSV<T>(filePath: string): Promise<T> {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: ObjectMap<any>) => {
        resolve(row as T);
      })
      .on('error', (error: any) => {
        reject(error);
      });
  });
}

export async function writeSingleToCSV<T extends object>(
  filePath: string,
  data: T,
): Promise<void> {
  const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory, { recursive: true });
  }
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: Object.keys(data).map((header) => ({ id: header, title: header })),
  });

  try {
    await csvWriter.writeRecords([data] as ObjectMap<any>[]);
    console.log('CSV file written successfully.');
  } catch (error: any) {
    console.error('Error writing to CSV file:', error.message);
  }
}

// npm install fs js-yaml csv-parser csv-writer
// npm install --save-dev @types/fs @types/js-yaml @types/csv-parser @types/csv-writer
