import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

const logger = new Logger('TemplateUtils');

type VariableValue = string | boolean | number;

export function convertObjectValuesToString(
  obj: Record<string, any>,
): Record<string, VariableValue> {
  const result: Record<string, VariableValue> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = String(value);
  }
  return result;
}

// Function to copy template files from template_dir to project_dir
export async function copyTemplateFiles(
  templateDirPath: string,
  projectDirPath: string,
  variables: Record<string, string>,
) {
  try {
    // Create the project directory
    const resolvedProjectDirPath: string = path.resolve(projectDirPath);

    // Check if the project directory exists
    if (fs.existsSync(resolvedProjectDirPath)) {
      console.error(
        `Project directory ${resolvedProjectDirPath} already exists`,
      );
      return;
    }

    if (!fs.existsSync(resolvedProjectDirPath)) {
      await fs.mkdir(resolvedProjectDirPath, { recursive: true });
    }

    // Get all items (files and directories) in the template directory
    const itemsInTemplateDir = await fs.readdir(templateDirPath);

    // Perform the copy operation for each item
    for (const item of itemsInTemplateDir) {
      const srcItemPath = path.join(templateDirPath, item);
      const destItemName = item.endsWith('.j2') ? item.slice(0, -3) : item;
      const destItemPath = path.join(resolvedProjectDirPath, destItemName);

      // Check if the item is a file or a directory
      const itemStats = await fs.lstat(srcItemPath);
      if (itemStats.isFile()) {
        // logger.verbose(`Copying file ${srcItemPath} to ${destItemPath}`);
        // await fs.copy(srcItemPath, destItemPath);
        // Read the content of the source file
        let fileContent = await fs.readFile(srcItemPath, 'utf8');

        // Replace variables in the file content using Jinja-like placeholders
        for (const [variable, value] of Object.entries(variables)) {
          const placeholder = `{{ ${variable} }}`;
          fileContent = fileContent.replace(
            new RegExp(placeholder, 'g'),
            value,
          );
        }

        // Write the modified content to the destination file
        await fs.writeFile(destItemPath, fileContent, 'utf8');
      } else if (itemStats.isDirectory()) {
        // logger.verbose(
        //   `Recursively copying directory ${srcItemPath} to ${destItemPath}`,
        // );
        await copyTemplateFiles(srcItemPath, destItemPath, variables);
      } else {
        logger.error(
          `Skipping ${srcItemPath} as it is not a file or directory`,
        );
      }
    }
    // logger.debug(
    //   `Template files from ${templateDirPath} copied successfully to ${projectDirPath}.`,
    // );
  } catch (err) {
    logger.error('Error copying template files:', err);
  }
}

// npm install fs-extra
// npm install --save-dev @types/fs-extra
