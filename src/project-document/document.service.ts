import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
// import { getDocumentPath } from '../common/command/common-command.utils';
import { DocumentCommandOptionsDTO } from '../project-document/command/dto/document-command-options.dto';
import { readSingleFromJSON } from '../utils/json/json.utils';
import {
  copyTemplateFile,
  getTemplateRootPath,
} from '../utils/template/template.utils';
import {
  DEFAULT_VARIABLE_FILE_PATH,
  DEFAULT_DOCUMENT_FILE_PATH,
  DEFAULT_DOCUMENT_VARIABLE_TEMPLATE_FILE_PATH,
} from '../common/constant';
// import {
//   convertObjectValuesToString,
//   copyTemplateFilesToProjectDir,
// } from '../utils/template/template.utils';

@Injectable()
export class DocumentService {
  private readonly logger = new Logger(DocumentService.name);
  constructor() {}

  public async getVariablesTemplate(
    documentCommandOptionsDTO: DocumentCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Copying variables template');

    const sourceTemplateFilePath: string = path.join(
      getTemplateRootPath(),
      DEFAULT_DOCUMENT_VARIABLE_TEMPLATE_FILE_PATH,
    );
    this.logger.debug(`sourceTemplateFilePath: ${sourceTemplateFilePath}`);

    const destinationTemplateFilePath: string = path.join(
      documentCommandOptionsDTO.documentVariablesFilePath ??
        DEFAULT_VARIABLE_FILE_PATH,
      documentCommandOptionsDTO.documentVariablesFileName ??
        'document-variables.json',
    );
    if (fs.existsSync(destinationTemplateFilePath)) {
      this.logger.error(
        `Variables file already exists at ${destinationTemplateFilePath}`,
      );
      return;
    }
    this.logger.debug(
      `destinationTemplateFilePath: ${destinationTemplateFilePath}`,
    );

    fs.copyFile(
      sourceTemplateFilePath,
      destinationTemplateFilePath,
      (error) => {
        if (error) {
          console.error(error);
          throw error;
        }
        console.log(
          `Successfully copied variables template to ${destinationTemplateFilePath}`,
        );
      },
    );
  }

  public async generateDocument(
    documentCommandOptionsDTO: DocumentCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> initializing document document');

    const currentFilePath: string = path.dirname(__dirname);
    this.logger.debug(`currentFilePath: ${currentFilePath}`);

    const variableFilePath: string = path.join(
      documentCommandOptionsDTO.documentVariablesFilePath ??
        DEFAULT_VARIABLE_FILE_PATH,
      documentCommandOptionsDTO.documentVariablesFileName ??
        'document-variables.json',
    );
    const resolvedVariableFilePath = path.resolve(variableFilePath);
    if (!fs.existsSync(resolvedVariableFilePath)) {
      throw new Error(
        `Variables file not found at ${resolvedVariableFilePath}`,
      );
    }
    this.logger.debug(`resolvedVariableFilePath: ${resolvedVariableFilePath}`);

    const templateFilePath: string = path.join(
      currentFilePath,
      'template',
      'document',
      documentCommandOptionsDTO.documentType ?? 'hld',
      documentCommandOptionsDTO.documentType + '.md.j2',
    );
    this.logger.debug(`templateFilePath: ${templateFilePath}`);

    const documentFilePath: string = path.join(
      documentCommandOptionsDTO.documentFilePath ?? DEFAULT_DOCUMENT_FILE_PATH,
      documentCommandOptionsDTO.documentFileName ?? 'document.md',
    );
    const resolvedDocumentFilePath = path.resolve(documentFilePath);
    this.logger.debug(`resolvedDocumentFilePath: ${resolvedDocumentFilePath}`);
    if (fs.existsSync(resolvedDocumentFilePath)) {
      throw new Error(
        `Document file already exists at ${resolvedDocumentFilePath}`,
      );
    }

    const variables: Record<string, any> = readSingleFromJSON<
      Record<string, any>
    >(resolvedVariableFilePath);
    await copyTemplateFile(
      templateFilePath,
      resolvedDocumentFilePath,
      variables,
    );
    console.log(`Successfully created document at ${resolvedDocumentFilePath}`);
  }
}
