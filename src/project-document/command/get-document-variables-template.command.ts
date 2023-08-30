import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { DocumentService } from '../document.service';
import { DocumentCommandOptionsDTO } from './dto/document-command-options.dto';
import { DocumentVariablesFilePathAnswerDTO } from './dto/document-variables-file-path-answer.dto';
import { DocumentVariablesFileNameAnswerDTO } from './dto/document-variables-file-name-answer.dto';
import { DEFAULT_VARIABLE_FILE_PATH } from '../../common/constant';

@Injectable()
@SubCommand({
  name: 'get-document-variables-template',
  description: 'A command to get a document project variables template',
  options: { isDefault: true },
})
export class GetDocumentVariablesTemplateCommand extends CommandRunner {
  private readonly logger = new Logger(
    GetDocumentVariablesTemplateCommand.name,
  );
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly documentService: DocumentService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> getting variables template');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const documentCommandOptionsDTO: DocumentCommandOptionsDTO = {
      ...options,
    };

    // while (!documentCommandOptionsDTO.templateRoot) {
    //   documentCommandOptionsDTO.templateRoot = (
    //     await this.inquirer.ask<TemplateRootAnswerDTO>(
    //       'template-root-questions',
    //       options,
    //     )
    //   ).templateRoot;
    // }

    while (!documentCommandOptionsDTO.documentVariablesFilePath) {
      documentCommandOptionsDTO.documentVariablesFilePath = (
        await this.inquirer.ask<DocumentVariablesFilePathAnswerDTO>(
          'document-variables-path-name-questions',
          options,
        )
      ).documentVariablesFilePath;
    }

    while (!documentCommandOptionsDTO.documentVariablesFileName) {
      documentCommandOptionsDTO.documentVariablesFileName = (
        await this.inquirer.ask<DocumentVariablesFileNameAnswerDTO>(
          'document-variables-file-name-questions',
          options,
        )
      ).documentVariablesFileName;
    }

    try {
      await this.documentService.getVariablesTemplate(
        documentCommandOptionsDTO,
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // @Option({
  //   flags: '-t, --template-root [templateRoot]',
  //   defaultValue: 'template',
  //   description: 'Your template root',
  // })
  // parseTemplateRoot(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-v, --variables-file-path [documentVariablesFilePath]',
    defaultValue: DEFAULT_VARIABLE_FILE_PATH,
    description: 'Your variables file path',
  })
  parseDocumentVariablesFilePath(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --variables-file-name [documentVariablesFileName]',
    defaultValue: 'project-suite-variables.json',
    description: 'Your variables file name',
  })
  parseDocumentVariablesFileName(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main document generate --help
// node ./dist/cmd.main document generate -s src -g github -l document -t library -e team -u user -n project -m module
