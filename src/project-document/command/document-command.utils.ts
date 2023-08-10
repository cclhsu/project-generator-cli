import { InquirerService } from 'nest-commander';
import { ConfigService } from 'src/config/config.service';
import { DocumentCommandOptionsDTO } from 'src/project-document/command/dto/document-command-options.dto';
import { TemplateRootAnswerDTO } from 'src/common/command/dto/template-root-answer.dto';
import { DocumentVariablesFilePathAnswerDTO } from './dto/document-variables-file-path-answer.dto';
import { DocumentVariablesFileNameAnswerDTO } from './dto/document-variables-file-name-answer.dto';
import { DocumentTypeAnswerDTO } from './dto/document-type-answer.dto';
import { DocumentFilePathAnswerDTO } from './dto/document-file-path-answer.dto';
import { DocumentFileNameAnswerDTO } from './dto/document-file-name-answer.dto';

export async function getDocumentCommandOptionsDTO(
  configService: ConfigService,
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
): Promise<DocumentCommandOptionsDTO> {
  const documentCommandOptionsDTO: DocumentCommandOptionsDTO = {
    ...options,
  };

  // while (!documentCommandOptionsDTO.configPath) {
  //   documentCommandOptionsDTO.configPath = (
  //     await inquirer.ask<ConfigPathAnswerDTO>('config-path-questions', options)
  //   ).configPath;
  // }

  while (!documentCommandOptionsDTO.templateRoot) {
    documentCommandOptionsDTO.templateRoot = (
      await inquirer.ask<TemplateRootAnswerDTO>(
        'template-root-questions',
        options,
      )
    ).templateRoot;
  }

  while (!documentCommandOptionsDTO.documentVariablesFilePath) {
    documentCommandOptionsDTO.documentVariablesFilePath = (
      await inquirer.ask<DocumentVariablesFilePathAnswerDTO>(
        'document-variables-path-name-questions',
        options,
      )
    ).documentVariablesFilePath;
  }

  while (!documentCommandOptionsDTO.documentVariablesFileName) {
    documentCommandOptionsDTO.documentVariablesFileName = (
      await inquirer.ask<DocumentVariablesFileNameAnswerDTO>(
        'document-variables-file-name-questions',
        options,
      )
    ).documentVariablesFileName;
  }

  while (!documentCommandOptionsDTO.documentType) {
    documentCommandOptionsDTO.documentType = (
      await inquirer.ask<DocumentTypeAnswerDTO>(
        'document-type-questions',
        options,
      )
    ).documentType;
  }

  while (!documentCommandOptionsDTO.documentFilePath) {
    documentCommandOptionsDTO.documentFilePath = (
      await inquirer.ask<DocumentFilePathAnswerDTO>(
        'document-file-path-questions',
        options,
      )
    ).documentFilePath;
  }

  while (!documentCommandOptionsDTO.documentFileName) {
    documentCommandOptionsDTO.documentFileName = (
      await inquirer.ask<DocumentFileNameAnswerDTO>(
        'document-file-name-questions',
        options,
      )
    ).documentFileName;
  }

  // const { configPath } = documentCommandOptionsDTO;
  const { templateRoot } = documentCommandOptionsDTO;
  const { documentVariablesFilePath } = documentCommandOptionsDTO;
  const { documentVariablesFileName } = documentCommandOptionsDTO;
  const { documentType } = documentCommandOptionsDTO;
  const { documentFilePath } = documentCommandOptionsDTO;
  const { documentFileName } = documentCommandOptionsDTO;

  displayDocumentOptionsResults(
    // configPath ?? 'N/A',
    templateRoot ?? 'N/A',
    documentVariablesFilePath ?? 'N/A',
    documentVariablesFileName ?? 'N/A',
    documentType ?? 'N/A',
    documentFilePath ?? 'N/A',
    documentFileName ?? 'N/A',
  );

  return documentCommandOptionsDTO;
}

function displayDocumentOptionsResults(
  // configPath: string,
  templateRoot: string,
  documentVariablesFilePath: string,
  documentVariablesFileName: string,
  documentType: string,
  documentFilePath: string,
  documentFileName: string,
): void {
  // console.log(`configPath: ${configPath}`);
  console.log(`templateRoot: ${templateRoot}`);
  console.log(`documentVariablesFilePath: ${documentVariablesFilePath}`);
  console.log(`documentVariablesFileName: ${documentVariablesFileName}`);
  console.log(`documentType: ${documentType}`);
  console.log(`documentFilePath: ${documentFilePath}`);
  console.log(`documentFileName: ${documentFileName}`);
}
